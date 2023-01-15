const StorageCtrl = (function (){
    return {
        storeItem: function (item){
            let items
            if (localStorage.getItem('items') === null){
                items = []
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem('items'))
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            }
        },
        getItemsFromStorage: function (){
            let items;
            if (localStorage.getItem('items') === null){
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        changeItemFromLS: function (id, newItem){
            if (localStorage.getItem("items") === null){

            } else {
                let items;
                items = JSON.parse(localStorage.getItem("items"))
                items[id] = newItem
                localStorage.setItem("items", JSON.stringify(items))
            }
        },
        delItemFromLS: function (id){
            if (localStorage.getItem("items") === null) {

            } else {
                let items;
                items = JSON.parse(localStorage.getItem("items"))
                items.splice(id,1)
                localStorage.setItem("items", JSON.stringify(items))
            }
        }
    }
})();

const itemCtrl = (function (){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    const data = {
        items: [
            //{id: 0, name: 'Steak Dinner', calories: 1200},
            //{id: 1, name: 'Cookie', calories: 400},
            //{id: 2, name: 'Eggs', calories: 300},
        ],
        total: 0,
        currentItem: null
    }

    return {
        getItems: function (){
            return data.items
        },
        setCurrentItem: function (item){
            data.currentItem = item
        },
        getCurrentItem: function () {
            return data.currentItem
        },
        addItem: function (name, calories){
            let ID;
            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                console.log(ID)
            } else {
                ID = 0
            }
            calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem
        },
        getTotalCalories: function (){
          let total = 0;
          data.items.forEach(function (item){
              total = total + item.calories;
          });
          data.total = total;
          console.log(data.total)
            return data.total
        },
        logData: function (){
            return data
        }
    }
})();

const UICtrl = (function (){
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        editBtn: '.edit-btn',
        deleteBtn: '.del-btn'
    }
    return {
        populateItemList: function (items){
            let html = '';

            items.forEach(function (item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;

            });
            document.querySelector(UISelectors.itemList).innerHTML = html
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item){
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}:</strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = itemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = itemCtrl.getCurrentItem().calories
            }
    }
})();

const App = (function (itemCtrl, StorageCtrl, UICtrl){
    const loadEventListeners = function (){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('DOMContentLoaded', getItemsFromStorage);
        document.querySelector(UISelectors.editBtn).addEventListener('click',update);
        document.querySelector("ul").addEventListener("click", updatecalory);
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", delItem)

    }

    const itemAddSubmit = function (event){
        const input = UICtrl.getItemInput()
        if (input.name !== '' && input.calories !== ''){
            const newItem = itemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem)
            const totalCalories = itemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
            StorageCtrl.storeItem(newItem);
            UICtrl.clearInput();
        }
        event.preventDefault()
    }
    const updatecalory = function (event){
        const UISelector = UICtrl.getSelectors()
        if(event.target.className === "edit-item fa fa-pencil"){
            document.querySelector(UISelector.editBtn).style.display = "inline"
            document.querySelector(UISelector.addBtn).style.display = "none"
            document.querySelector(UISelector.deleteBtn).style.display = "inline"
            event.target.parentElement.parentElement.id = "item-update"
            const itemToEdit = itemCtrl.getItems(id)
            itemCtrl.setCurrentItem(itemToEdit)
            UICtrl.addItemToForm()
        }}
    const update = function (){
        const input = UICtrl.getItemInput()
        const UISelector = UICtrl.getSelectors()
        const newItem = itemCtrl.addItem(input.name, input.calories)
        if (input.name !== '' && input.calories !== '') {
            const list = document.querySelector("#item-list")
            var nodes = Array.from(list.children)
            NewID = nodes.indexOf(document.querySelector("#item-update"))
            const updateitem = `<strong>${newItem.name}:</strong><em>${newItem.calories} Calories</em> <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`
            document.querySelector("#item-update").innerHTML = updateitem
            document.querySelector("#item-update").id = `item-${NewID}`
            newItem.id = NewID
            const totalCalories = itemCtrl.getTotalCalories()
            UICtrl.showTotalCalories(totalCalories)
            StorageCtrl.changeItemFromLS(NewID, newItem)
            document.querySelector(UISelector.addBtn).style.display = "inline"
            document.querySelector(UISelector.editBtn).style.display = "none"
            document.querySelector(UISelector.deleteBtn).style.display = "none"
            event.preventDefault()
        }
    }
    const delItem = function (){
        const list = document.querySelector("#item-list")
        const UISelect = UICtrl.getSelectors()
        var nodes = Array.from(list.children)
        delID = nodes.indexOf(document.querySelector("#item-update"))
        StorageCtrl.delItemFromLS(delID)
        list.removeChild(list.children[delID])
        document.querySelector(UISelect.addBtn).style.display = "inline"
        document.querySelector(UISelect.editBtn).style.display = "none"
        document.querySelector(UISelect.deleteBtn).style.display = "none"
    }
    const getItemsFromStorage = function (){
        const items = StorageCtrl.getItemsFromStorage()
        items.forEach(function (item){
            itemCtrl.addItem(item['name'], item['calories'])
        })
        const totalcalories = itemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalcalories);
        UICtrl.populateItemList(items)
    }
    return {
        init: function (){
            const items = itemCtrl.getItems()
            console.log(items)
            UICtrl.populateItemList(items)
            loadEventListeners();
        }
    }
})(itemCtrl, StorageCtrl, UICtrl)

App.init()