var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

const contentInfo = document.getElementById('info-content')
const table = document.getElementById('table-data')
const tbody = document.getElementsByTagName('tbody')
const active = document.getElementsByClassName('active')
const search = document.getElementById('search-box')

//used fetch to consume api

fetch(url)
    .then(response => response.json())
    .then(data => {

        data.map((elem) => {
            const { id, firstName, lastName, email, phone, address, description } = elem

            const container = document.createElement('tr')
            const mId = document.createElement('td')
            const fName = document.createElement('td')
            const lName = document.createElement('td')
            const mEmail = document.createElement('td')
            const mPhone = document.createElement('td')
            const text1 = document.createTextNode('')
            const text2 = document.createTextNode('')
            const text3 = document.createTextNode('')
            const text4 = document.createTextNode('')
            const text5 = document.createTextNode('')
            const text6 = document.createTextNode('')

            container.classList = 'data-row';
            mId.classList = 'column1';
            fName.classList = 'column2';
            lName.classList = 'column3';
            mEmail.classList = 'column4';
            mPhone.classList = 'column5';

            mId.innerText = `${id}`;
            fName.innerText = `${firstName}`;
            lName.innerText = `${lastName}`;
            mEmail.innerText = `${email}`;
            mPhone.innerText = `${phone}`;

            container.appendChild(text1)
            container.appendChild(mId)
            container.appendChild(text2)
            container.appendChild(fName)
            container.appendChild(text3)
            container.appendChild(lName)
            container.appendChild(text4)
            container.appendChild(mEmail)
            container.appendChild(text5)
            container.appendChild(mPhone)
            container.appendChild(text6)
            tbody[0].appendChild(container)

            // to get the rows from td tag after api request success and appended in table

            const rows = document.querySelectorAll('.data-row')

            rows.forEach(element => {
                let firstN = element.childNodes[3].childNodes[0].nodeValue
                let lastN = element.childNodes[5].childNodes[0].nodeValue
                let emailList = element.childNodes[7].childNodes[0].nodeValue
                let idList = element.childNodes[1].childNodes[0].nodeValue
                let phoneList = element.childNodes[9].childNodes[0].nodeValue

                // * as the problem stated, i couldn't change html and css, therefore i manipulated the data that was given already there and then worked on data that i fetched from api. Also, that is the reason for starting 21 rows, that was already in html, the details data is not available.

                element.addEventListener('click', (e) => {
                    e.preventDefault()
                    active[0].classList.toggle('active')
                    element.classList.toggle('active')
                    contentInfo.setAttribute('id', 'display')

                    if (element.childNodes[1].childNodes[0].nodeValue !== id) {

                        contentInfo.childNodes[1].childNodes[1].nodeValue = ` ${firstN} ${lastN}`;

                    }
                    if (element.childNodes[1].childNodes[0].nodeValue == id) {
                        contentInfo.childNodes[1].childNodes[1].nodeValue = ` ${firstName} ${lastName}`;
                        contentInfo.childNodes[3].childNodes[3].childNodes[0].nodeValue = `${description}`;
                        contentInfo.childNodes[5].childNodes[1].nodeValue = ` ${address.streetAddress}`;
                        contentInfo.childNodes[7].childNodes[1].nodeValue = ` ${address.city}`;
                        contentInfo.childNodes[9].childNodes[1].nodeValue = ` ${address.state}`;
                        contentInfo.childNodes[11].childNodes[1].nodeValue = ` ${address.zip}`;
                    }
                })

                // implemented search using search() in JS, tried to implement search for numbers as well. Also you need to press enter to run the search and press enter in empty input to reset it.

                search.addEventListener('keypress', (e) => {
                    let searchInput = search.value.toUpperCase()
                    let upperFName = firstN.toUpperCase()
                    let upperLName = lastN.toUpperCase()
                    let upperEmail = emailList.toUpperCase()
                    let searchResult1 = upperFName.search(searchInput)
                    let searchResult2 = upperLName.search(searchInput)
                    let searchResult3 = upperEmail.search(searchInput)
                    let searchResult4 = idList.search(searchInput) || phoneList.search(searchInput)
                    
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        if (searchResult1 > -1 || searchResult2 > -1 || searchResult3 > -1 || searchResult4 > -1) {
                            element.removeAttribute('id', 'info-content')
                        }
                        else {
                            element.setAttribute('id', 'info-content')
                        }
                    }
                })
            });
        })

    })




