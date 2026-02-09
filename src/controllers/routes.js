import { Router } from 'express';

// Create a new router instance
const router = Router();

// TODO: Add import statements for controllers and middleware
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { homePage, aboutPage, demoPage, testErrorPage } from '../controllers/index.js';
import { catalogPage, courseDetailPage } from '../controllers/catalog/catalog.js';
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js';

// Add catalog-specific styles to all catalog routes
router.use('/catalog', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/catalog.css">');
    next();
});

// Add faculty-specific styles to all faculty routes
router.use('/faculty', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/faculty.css">');
    next();
});

// TODO: Add route definitions
// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:slugId', courseDetailPage);

// Faculty directory routes
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultySlug', facultyDetailPage);

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;