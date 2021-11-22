const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_on_products'}]
    });
    res.status(200).json(tagData);
    console.log('get tag data!')
  } catch (err) {
    res.status(500).json(err);
  }});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_on_products'}]
    });
    res.status(200).json(tagData);
    console.log('get tag data by id!')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
    console.log('post tag data!')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {tag_name: req.body.tag_name}, {
        where: {
          id: req.params.id
      }
    });
    res.status(200).json(tagData);
    console.log('update tag data by id!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
    console.log('delete tag data by id!')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
