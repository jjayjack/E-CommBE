const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
    const categE = await Category.findAll({
      include: [{model: Product}],
    });
  res.status(200).json(categE);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
    categE = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categE) {
      res.status(404).json({ message: 'No category found with that id!'})
      return;
    }
    res.status(200).json(categE);
  } catch(error) {
    res.status(500).json(error);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categE = await Category.create(req.body);
    res.status(200).json(categE);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categE = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categE[0]) {
      res.status(404).json({ message: 'No category with that id'});
      return;
    }
    res.status(200).json(categE);
  } catch(error) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
   try {
    const categE = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categE) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    
    res.status(200).json(categE);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
