let kong = {};

kong.install = function (Vue, options) {
    Vue.directive(options.name, (element, params) => {
        element.innerHTML = params.value == "konglong" ? "🦖" : '🐱'
    })
}

export default kong