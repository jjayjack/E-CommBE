const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const commE = await Tag.findAll({
      include: [{model: Product}],
    });
  res.status(200).json(commE);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const commE = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!commE) {
      res.status(404).json({message: 'No product found with that id'});
      return;
    }

    res.status(200).json(commE);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const commE = await Tag.create(req.body);
    res.status(200).json(commE);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const commE = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commE[0]) {
      res.status(404).json({ message: 'No tag with that id'});
      return;
    }
    res.status(200).json(commE);
  } catch(error) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagI = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagI) {
      res.status(404).json({ message: 'No tag found with that id'});
      return;
    }
    
    res.status(200).json(tagI);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
