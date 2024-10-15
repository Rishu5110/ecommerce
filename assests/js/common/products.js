const product_key = "products";  // products table name for local stroage

function addProduct()
{

    var name = document.getElementById("product_name").value;
    var img = document.getElementById("product_image_url").value;
    var price = document.getElementById("product_price").value;
    var category = document.getElementById("product_category").value;
    var quantity = document.getElementById("product_quantity").value;
    var description = document.getElementById("product_description").value;
    var featured=document.getElementById("product_featured").checked;

    if (img.trim() == '' || name.trim() == '' || price.trim() == '' || quantity.trim() == '' || description.trim() == '' || category.trim() == '')
    {
        alert("Plaese fill all details");
        return;
    }
    else
    {
        var x = JSON.parse(localStorage.getItem(product_key)) || [];

        for (let i = 0; i < x.length; i++)
        {
            
            if (x[i].name == name)
            {
                alert("Product already exists");   // to check whwther a product is present or not
                return;
            }

        }

        var obj = {
            image: img,
            name: name,
            price: parseFloat(price),
            category: category.split(","),
            quantity: parseInt(quantity),
            description: description,
            is_featured:featured
        };

        x.push(obj);
        
        localStorage.setItem(product_key, JSON.stringify(x));

        alert("Product added successfully");

        document.getElementById("product_name").value = "";
        document.getElementById("product_image_url").value = "";
        document.getElementById("product_price").value = "";
        document.getElementById("product_quantity").value = "";
        document.getElementById("product_category").value = "";
        document.getElementById("product_description").value = "";
        
        admin_get_products()

    }
}


function admin_get_products()
{
    let table = document.getElementById('admin_product_table');

    let x = JSON.parse(localStorage.getItem(product_key)) || [];

    if(x.length == 0)
    {
        table.innerHTML = "<tr><td colspan='8'>No Product Found</td></tr>";
        return;
    }
    else
    {
        table.innerHTML = "";

        for (let i = 0; i < x.length; i++) 
        {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${i+1}</td>
                            <td><img src="${x[i].image}" alt="No Image Found" width="80px"></td>
                            <td>${x[i].name || ""}</td>
                            <td>${x[i].price || ""}</td>
                            <td>${x[i].category || "No Category"}</td>
                            <td>${x[i].quantity || 0}</td>
                             <td>${x[i].quantity>50 ?"<p style='color:green'> Good</p>":x[i].quantity >20?"<p style='color:orange'>Refill</p>":"<p style='color:red'>Urgent</p>"}</td>
                            <td>${x[i].is_featured ? "Yes":"No"}</td>
                            <td>
                                <button style="margin: 4px;" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editProducts" onclick="edit_product(${i})">Edit</button>
                                <button style="margin: 4px;" class="btn btn-success" onclick="delete_product(${i})">Delete</button>
                                
                            </td>`;

            table.appendChild(tr);
        }

    }
}

function delete_product(index)
{
    if(confirm('Are you sure to delete this Product?'))
        {
            let x = JSON.parse(localStorage.getItem(product_key)) || [];
    
            x.splice(index, 1);
    
            localStorage.setItem(product_key, JSON.stringify(x));
    
            alert('Product Deleted');
    
            admin_get_products();
        }
}

function edit_product(index)
{
    const x=JSON.parse(localStorage.getItem(product_key));

    const p=x[index];

    sessionStorage.setItem("edit",index);

        document.getElementById("edit_product_name").value = p.name;
        document.getElementById("edit_product_image_url").value =p.image;
        document.getElementById("edit_product_price").value = p.price;
        document.getElementById("edit_product_quantity").value =p.quantity;
        document.getElementById("edit_product_category").value = p.category;
        document.getElementById("edit_product_description").value = p.description;
        document.getElementById("edit_product_featured").checked=p.is_featured;
        
}

function saveProductChanges()
{
    const index=sessionStorage.getItem("edit");

    sessionStorage.removeItem("edit");

    var name = document.getElementById("edit_product_name").value;
    var img = document.getElementById("edit_product_image_url").value;
    var price = document.getElementById("edit_product_price").value;
    var category = document.getElementById("edit_product_category").value;
    var quantity = document.getElementById("edit_product_quantity").value;
    var description = document.getElementById("edit_product_description").value;
    var featured=document.getElementById("edit_product_featured").checked;

    if (img.trim() == '' || name.trim() == '' || price.trim() == '' || quantity.trim() == '' || description.trim() == '' || category.trim() == '')
        {
            alert("Plaese fill all details");
            return;
        }
        else
        {
            var x = JSON.parse(localStorage.getItem(product_key)) || [];
    
            for (let i = 0; i < x.length; i++)
            {
                
                if (x[i].name == name && index!=i)
                {
                    alert("Product already exists");   // to check whwther a product is present or not
                    return;
                }
    
            }
    
            var obj = {
                image: img,
                name: name,
                price: parseFloat(price),
                category: category.split(","),
                quantity: parseInt(quantity),
                description: description,
                is_featured:featured
            };
    
            x[index]=obj;
            
            localStorage.setItem(product_key, JSON.stringify(x));
    
            alert("Changes are saved successfully");
    
            document.getElementById("edit_product_name").value = "";
            document.getElementById("edit_product_image_url").value = "";
            document.getElementById("edit_product_price").value = "";
            document.getElementById("edit_product_quantity").value = "";
            document.getElementById("edit_product_category").value = "";
            document.getElementById("edit_product_description").value = "";
            
            admin_get_products()
    
        }

}



    

