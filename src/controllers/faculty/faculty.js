import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res) => {
    const sortBy = req.query.sort || 'name';
    const faculty = await getSortedFaculty(sortBy);
    res.render('faculty/list', { 
        faculty,
        sortBy,
        title: 'Faculty Directory'
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', { 
        faculty: facultyMember,
        title: `${facultyMember.name} - ${facultyMember.title}`
    });
};

export { facultyListPage, facultyDetailPage };