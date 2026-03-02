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

router.use(authMiddleware);

// Create
router.post('/', [
  body('title').notEmpty(),
  body('description').notEmpty()
], createRequest);

// List (with optional filter)
router.get('/', [
  query('status').optional().isString(),
  query('student').optional().isString()
], getRequests);

// Get one
router.get('/:id', [param('id').isMongoId()], getRequestById);

// Update (owner or admin)
router.put('/:id', [param('id').isMongoId()], updateRequest);

// Delete (owner or admin)
router.delete('/:id', [param('id').isMongoId()], deleteRequest);

// Change status (staff/admin)
router.put('/:id/status', [
  param('id').isMongoId(),
  body('status').isString()
], roleMiddleware(['staff', 'admin']), changeStatus);

// Add comment
router.post('/:id/comments', [
  param('id').isMongoId(),
  body('message').notEmpty()
], addComment);

// Add attachment (metadata)
router.post('/:id/attachments', [
  param('id').isMongoId(),
  body('filename').notEmpty(),
  body('url').isURL()
], addAttachment);

// Admin stats
router.get('/admin/stats', roleMiddleware(['admin']), adminDashboard);

export default router;