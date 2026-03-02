import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RequestModel from '../models/Request';
import CommentModel from '../models/Comment';
import AttachmentModel from '../models/Attachment';
import ActionLogModel from '../models/ActionLog';
import UserModel from '../models/User';

// create
export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, priority, tags } = req.body;
    const user = (req as any).user;

    const r = await RequestModel.create({
      title, description, priority: priority || 'MEDIUM', tags: tags || [], student: user._id
    });

    await ActionLogModel.create({ request: r._id, action: 'SUBMIT', actor: user._id, toStatus: r.status });

    res.status(201).json(r);
  } catch (err) { next(err); }
};

// list (student sees own, admin/staff see all)
export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { status, student } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (student && user.role === 'admin') filter.student = student;
    if (user.role === 'student') filter.student = user._id;

    const docs = await RequestModel.find(filter).populate('student assignedStaff').sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) { next(err); }
};

export const getRequestById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const doc = await RequestModel.findById(id).populate('student assignedStaff attachments');
    if (!doc) return res.status(404).json({ message: 'Not found' });

    if (user.role === 'student' && String(doc.student._id ?? doc.student) !== String(user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(doc);
  } catch (err) { next(err); }
};

export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    // only owner or admin can update (and only when not closed)
    if (user.role === 'student' && String(reqDoc.student) !== String(user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (reqDoc.status === 'CLOSED') return res.status(400).json({ message: 'Request closed' });

    Object.assign(reqDoc, req.body);
    await reqDoc.save();

    await ActionLogModel.create({ request: reqDoc._id, action: 'UPDATE', actor: user._id, note: 'Updated request' });
    res.json(reqDoc);
  } catch (err) { next(err); }
};

export const deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    if (user.role === 'student' && String(reqDoc.student) !== String(user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await reqDoc.deleteOne();
    await ActionLogModel.create({ request: id, action: 'DELETE', actor: user._id });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status, note, assignedStaff } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const from = reqDoc.status;
    reqDoc.status = status;
    if (assignedStaff) reqDoc.assignedStaff = assignedStaff;
    if (status === 'CLOSED') reqDoc.closedAt = new Date();
    await reqDoc.save();

    await ActionLogModel.create({ request: id, action: 'STATUS_CHANGE', actor: user._id, fromStatus: from, toStatus: status, note });
    res.json(reqDoc);
  } catch (err) { next(err); }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { message } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const comment = await CommentModel.create({ request: id, user: user._id, message });
    await reqDoc.incComments();
    await ActionLogModel.create({ request: id, action: 'COMMENT', actor: user._id, note: message });

    res.status(201).json(comment);
  } catch (err) { next(err); }
};

export const addAttachment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { filename, url } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const att = await AttachmentModel.create({ request: id, filename, url, uploadedBy: user._id });
    reqDoc.attachments.push(att._id);
    await reqDoc.save();

    await ActionLogModel.create({ request: id, action: 'ATTACH', actor: user._id, note: filename });
    res.status(201).json(att);
  } catch (err) { next(err); }
};

export const adminDashboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await RequestModel.countDocuments();
    const byStatus = await RequestModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ total, byStatus });
  } catch (err) { next(err); }
};