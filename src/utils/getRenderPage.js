const getRenderPage = (page, args) => (req, res) => {
  res.render(page, {...args})
}

module.exports = getRenderPage
