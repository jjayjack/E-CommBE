const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [{model: Product}],
    });
  res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!tag) {
      res.status(404).json({message: 'No tag found with that id'});
      return;
    }

    res.status(200).json(tag);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json(error);
  }
  Tag.create(req.body)
    .then((newTag) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(newTag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag[0]) {
      res.status(404).json({ message: 'No tag with that id'});
      return;
    }
    res.status(200).json(tag);
  } catch(error) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagI = await Tag.destroy({
      where: {
        id: req.params.id,
        
      },
    });
    if (!tagI) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tagI);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
