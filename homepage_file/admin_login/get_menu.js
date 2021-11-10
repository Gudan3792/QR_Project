if(typeof axios === 'undefined') {
   throw '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> 필요';
}

function createImgElement(imgData,imgType) {
    let img = document.createElement("img");
    var arrayBufferView = new Uint8Array( imgData );
    var blob = new Blob( [ arrayBufferView ], { type: imgType } );
    var urlCreator = window.URL || window.webkitURL;
    img.src = urlCreator.createObjectURL( blob );
    return img;
}

function createTextElement(data) {
    let title = document.createElement("p");
    let price = document.createElement("p");
    title.textContent = data.name;
    price.textContent = data.price;
    return [title,price];
}

async function getMenu(tag,childClassName) {
    let parent = document.getElementById(tag);
    if(parent.nodeName != 'UL') {
        throw "ul 태그만 사용 가능";
    }
    let list = (await axios.get("/api/get_menu")).data;
    list.forEach(data => {
        let li = document.createElement("li");
        li.setAttribute("class",childClassName);

        li.appendChild(createImgElement(data.img_data.data,data.img_type))
        let [title,price] = createTextElement(data);
        
        li.appendChild(title);
        li.appendChild(price);
        parent.appendChild(li);
    });
}
