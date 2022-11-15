const itemCtrl = (function (){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300},
        ],
        total: 0
    }

    return {
        logData: function (){
            return data
        }
    }
})();

const UICtrl = (function (){

})();

const App = (function (itemCtrl, UICtrl){
    return {
        init: function (){
            console.log('Initializing')
        }
    }
})(itemCtrl, UICtrl);

App.init()