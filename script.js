//Arra to store shopping list items
let shoppingList = 
JSON.parse(localStorage.getItem("shoppingList")) || [];

// Add item to the list
function  addItem() {
    const itemInput = 
document.getElementsById("itemInput");
    const item = itemInput.value.trim();
    if(item) {
        shoppingList.push({ name:item,purchased:false});
        itemInput.value='';
        updateLocalStorage();
        renderList();
    }
}

//Render the list
function renderList(){
    const itemList = 
document.getElementsById('itemList');
    itemList.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.dataset.index = index;
        if (item.purchased) {
            listItem.classList.add('purchased');
        }
        itemList.appendchild(listItem);
    });
}

//Mark selected item as purchased
function markPurchased(){
    const itemList =
document.getElementsById('itemList');
    const selectedItem = 
itemList.querSelector('li.selected');
    if (selectedItem) {
        const index = selectedItem.dataset.index;
        shoppingList[index].purchased = !
shoppingList[index].purchased;
        updateLocalStorage();
        renderList();
    }
}

//Clear the list
function clearList() {
    shoppingList = [];
    updateLocalStorage();
    renderList();
} 

//Edit selected item
function editItem() {
    const itemList =
document.getElementById('itemList');
    const selectedItem =
itemList.querySelector('li.selected');
    if (selectedItem) {
        const index = selectedItem.dataset.index;
        const newItem = prompt('Edit item:',shoppingList[index].name);
        if (newItem !== null) {
            shoppingList[index].name = newItem.trim();
            updateLocalStorage();
            renderList();
        }
    }
}

//Update local storage
function updateLocalStorage() {
    localStorage.setItem('shoppingList',JSON.stringify(shoppingList));
}

//Event listeners
document.getElementsById('addItem').addEventListener('click',addItem);
document.getElementsById('markPurchased').addEventListener('click', markPurchased);
document.getElementsById('clearList').addEventListener('click', clearList);
document.getElementById('itemList').addEventListener('dbclick',editItem);
document.getElementById('itemList').addEventListener('click', (e) => {
    const listItem = e.target;
    if (listItem.tagName === 'LI'){
        const selected = 
document.querySelector('li.selected');
        if (selected)
selected.classList.remove('selected');
        listItem.classList.add('selected');
    }
});

// Initial render
renderList();
