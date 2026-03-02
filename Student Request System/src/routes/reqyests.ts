import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  changeStatus,
  addComment,
  addAttachment,
  adminDashboard
} from '../controllers/requestController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// public for authenticated users
router.use(authMiddleware);

// create request
router.post('/', [
  body('title').notEmpty(),
  body('description').notEmpty()
], createRequest);

// list (with optional filter)
router.get('/', [
  query('status').optional().isString(),
  query('student').optional().isString(),
], getRequests);

// get one
router.get('/:id', [param('id').isMongoId()], getRequestById);

// update request (owner or admin)
router.put('/:id', [param('id').isMongoId()], updateRequest);

// delete request (owner or admin)
router.delete('/:id', [param('id').isMongoId()], deleteRequest);

// change status (staff/admin)
router.put('/:id/status', [
  param('id').isMongoId(),
  body('status').isString()
], roleMiddleware(['staff', 'admin']), changeStatus);

// add comment
router.post('/:id/comments', [
  param('id').isMongoId(),
  body('message').notEmpty()
], addComment);

// add attachment (metadata only)
router.post('/:id/attachments', [
  param('id').isMongoId(),
  body('filename').notEmpty(),
  body('url').isURL()
], addAttachment);

// admin dashboard
router.get('/admin/stats', roleMiddleware(['admin']), adminDashboard);

export default router;