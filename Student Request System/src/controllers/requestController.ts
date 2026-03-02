import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RequestModel from '../models/Request.js';
import CommentModel from '../models/Comment.js';
import AttachmentModel from '../models/Attachment.js';
import ActionLogModel from '../models/ActionLog.js';

/* CREATE */
export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { title, description, priority, tags } = req.body;

    const r = await RequestModel.create({
      title,
      description,
      priority: priority ?? 'MEDIUM',
      tags: tags ?? [],
      student: user.id
    });

    await ActionLogModel.create({ request: r._id, action: 'SUBMIT', actor: user.id, toStatus: r.status });

    return res.status(201).json(r);
  } catch (err) {
    next(err);
  }
};

/* LIST */
export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { status, student } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (student && user.role === 'admin') filter.student = student;
    if (user.role === 'student') filter.student = user.id;

    const docs = await RequestModel.find(filter)
      .populate('student', 'name email role')
      .populate('assignedStaff', 'name email role')
      .sort({ createdAt: -1 });

    return res.json(docs);
  } catch (err) {
    next(err);
  }
};

/* GET BY ID */
export const getRequestById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const doc = await RequestModel.findById(id).populate('student assignedStaff attachments commentsCount');
    if (!doc) return res.status(404).json({ message: 'Not found' });

    // student can only view own requests
    if (user.role === 'student' && String((doc.student as any)?._id ?? doc.student) !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json(doc);
  } catch (err) {
    next(err);
  }
};

/* UPDATE */
export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    if (user.role === 'student' && String(reqDoc.student) !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (reqDoc.status === 'CLOSED') return res.status(400).json({ message: 'Request closed' });

    Object.assign(reqDoc, req.body);
    await reqDoc.save();

    await ActionLogModel.create({ request: reqDoc._id, action: 'UPDATE', actor: user.id, note: 'Updated request' });

    return res.json(reqDoc);
  } catch (err) {
    next(err);
  }
};

/* DELETE */
export const deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    if (user.role === 'student' && String(reqDoc.student) !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await reqDoc.deleteOne();
    await ActionLogModel.create({ request: id, action: 'DELETE', actor: user.id });

    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

/* CHANGE STATUS */
export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const { status, note, assignedStaff } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const from = reqDoc.status;
    reqDoc.status = status;
    if (assignedStaff) reqDoc.assignedStaff = assignedStaff;
    if (status === 'CLOSED') reqDoc.closedAt = new Date();
    await reqDoc.save();

    await ActionLogModel.create({ request: id, action: 'STATUS_CHANGE', actor: user.id, fromStatus: from, toStatus: status, note });

    return res.json(reqDoc);
  } catch (err) {
    next(err);
  }
};

/* ADD COMMENT */
export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const { message } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const comment = await CommentModel.create({ request: id, user: user.id, message });
    reqDoc.commentsCount = (reqDoc.commentsCount ?? 0) + 1;
    await reqDoc.save();
    await ActionLogModel.create({ request: id, action: 'COMMENT', actor: user.id, note: message });

    return res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

/* ADD ATTACHMENT (metadata) */
export const addAttachment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const { filename, url } = req.body;

    const reqDoc = await RequestModel.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Not found' });

    const att = await AttachmentModel.create({ request: id, filename, url, uploadedBy: user.id });
    reqDoc.attachments.push(att._id);
    await reqDoc.save();

    await ActionLogModel.create({ request: id, action: 'ATTACH', actor: user.id, note: filename });

    return res.status(201).json(att);
  } catch (err) {
    next(err);
  }
};

/* ADMIN DASHBOARD */
export const adminDashboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await RequestModel.countDocuments();
    const byStatus = await RequestModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return res.json({ total, byStatus });
  } catch (err) {
    next(err);
  }
};