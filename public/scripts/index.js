
// Renders table with updated database
function renderTable() {
    GET_featued_alumni_entries((alumnis) => {
        alumnis.sort(function(a, b) {let textA = a.lastName.toUpperCase(); let textB = b.lastName.toUpperCase(); return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;});
        let tbody = document.querySelector('tbody');
        let clone = tbody.cloneNode(false);
        tbody.parentNode.replaceChild(clone, tbody);
        tbody = clone;
        tbody.addEventListener('mouseover', buttonVisibility);
        for (i in alumnis) {
            let tr = document.createElement('tr'); 
            //Orignally wanted to set toggle on tr but delete button triggered the modal to appear 
            //So set it to each col so can give the idea the 'entire' row is clickable 
            // tr.setAttribute('data-toggle', 'modal');
            // tr.setAttribute('data-target', '#form_modal');
            // tr.setAttribute('data-type', 'View');
            // tr.setAttribute('alumni_id', `${alumnis[i]._id}`);
            tr.innerHTML = `
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].firstName}</td>
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].lastName}</td>
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].gradYear}</td>
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].degreeType}</td>
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].occupation}</td>
            <td class='text-truncate' data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].email}</td>
            <td data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].emailList}</td>
            <td data-toggle='modal' data-target='#form_modal' data-type='View' alumni_id='${alumnis[i]._id}'>${alumnis[i].isFeatured}</td>`;
            tbody.appendChild(tr);
        }

        addDeleteEventListeners();
    })
}

// Alumni entries get handler using ajax
function GET_featured_alumni_entries(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/alumnis/featured', true);
    
    xhr.send();

    xhr.onload = function() {
        if (callback) {callback(JSON.parse(xhr.response))}
    }

    xhr.onerror = function() {
        console.log('XMLHTTPRequest error');
    }

}
