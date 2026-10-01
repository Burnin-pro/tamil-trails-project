import Package from '../models/Package.js';

export const getPackages = async (req, res, next) => {
  try {
    const { tier } = req.query;
    const filter = tier ? { tier } : {};
    const packages = await Package.find(filter).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    next(error);
  }
};

export const getPackageBySlug = async (req, res, next) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) {
      res.status(404);
      throw new Error('Package not found');
    }
    res.json(pkg);
  } catch (error) {
    next(error);
  }
};
