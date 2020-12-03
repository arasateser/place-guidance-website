
const hakkinda=function(req, res, next) {
  res.render('hakkinda', { title: 'Hakkinda',
                         'footer':'Aras Ateşer', });
}

module.exports={
	hakkinda
}