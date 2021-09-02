// checking connection
console.log('connected');
// no image pic
const defaultPic = 'default-pic.jpg'
const bookDisplay = document.getElementById('searchResults');

const statusText = document.getElementById('updateStatus');
statusText.style.display = 'none';


// loading status
const statusUpdate = (searching, count = 0) => {
    // while loading
    if (searching && count == 0) {
        statusText.style.display = 'block';
        statusText.textContent = `Loading...`;

    }
    // when result found
    else if (searching && count > 0) {
        statusText.style.display = 'block';
        statusText.textContent = `${count} results were found`;


    }
    // no result found
    else {
        statusText.style.display = 'block';
        bookDisplay.textContent = '';

        statusText.textContent = 'No Results for this search';

    }

}

// search function for  searchItem 
const getItem = () => {

    console.log('inside');
    // getting search field 
    const searchItem = document.getElementById('searchText');
    const url = `https://openlibrary.org/search.json?q=${searchItem.value}`;
    console.log(url);
    statusUpdate(true);
    searchItem.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => data.docs.length === 0 ? statusUpdate(false) : bookData(data));

}

// display function
const bookData = (data) => {

    // defining img url
    const imageURL = 'https://covers.openlibrary.org/b/id/';
    bookDisplay.textContent = '';
    // looping over the data
    data.docs.forEach(info => {
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('col');

        bookInfo.innerHTML =
            `    <div class="card">
            
        <img height="380" src="${info.cover_i ? `${imageURL + info.cover_i}-M.jpg` : `${defaultPic}`}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title my-3 "><span class="fw-bolder">Book:</span> ${info.title}</h5>
            <h5 class="card-title my-3"><span class="fw-bolder">Author:</span> ${info.author_name[0] ? `${info.author_name[0]}` : `${" "}`}</h5>
            <h5 class="card-title my-3"><span class="fw-bolder">Publisher:</span> ${info.publisher[0] ? `${info.publisher[0]}` : `${" "}`}</h5>
            <h5 class="card-title my-3"><span class="fw-bolder">First Published:</span> ${info.first_publish_year}</h5>
           
        </div>
    </div>
</div>`
        bookDisplay.appendChild(bookInfo);
        statusUpdate(true, data.numFound)


    }


    );


}