const user_key = "user";  // user table name for local stroage

function signup() 
{

    var username = document.getElementById("signup_username").value;
    var password = document.getElementById("signup_password").value;
    var email = document.getElementById("signup_email").value;
    var cpassword = document.getElementById("signup_cpassword").value;

    if (username.trim() == '' || email.trim() == '' || password.trim() == '' || cpassword.trim() == '') {
        alert("Plaese fill all details");
        return;
    }

    else if (cpassword != password) {
        alert("password and confirmed password are not equal");
        return;
    }
    else {

        var x = JSON.parse(localStorage.getItem(user_key)) || [];

        for (let i = 0; i < x.length; i++) {
            if (x[i].email == email) {
                alert("User already exists");
                return;
            }
        }

        var obj = {
            username: username,
            email: email,
            password: password,
            orders : 0,
            status : 1
        };

        x.push(obj);
        
        localStorage.setItem(user_key, JSON.stringify(x));

        alert("Registered successfully");

        document.getElementById("signup_username").value = "";
        document.getElementById("signup_password").value = "";
        document.getElementById("signup_email").value = "";
        document.getElementById("signup_cpassword").value = "";

    }

}

function login() 
{

    var email = document.getElementById('login_email').value;
    var password = document.getElementById('login_password').value;

    if (email.trim() == '' || password.trim() == '') 
    {
        alert('Please fill all the fields');
        return;
    }
    else
    {

        var x = JSON.parse(localStorage.getItem(user_key)) || [];

        for (var i = 0; i < x.length; i++) 
        {
            
            if (x[i].email == email) 
            {
                if (x[i].password != password)
                {
                    alert('Invalid Credentials');
                    return;
                }
                else
                {
                    
                    if(x[i].status == 0)
                    {
                        alert(`User ${email} is blocked`);
                        return;
                    }
                    else
                    {
                        sessionStorage.setItem('user', JSON.stringify(x[i]));
                        alert('Login Successful');
                        return;
                    }
                    
                }
            }
        }

        alert('User Not Found');

    }

}

function admin_get_users()
{

    let table = document.getElementById('admin_user_table');

    let x = JSON.parse(localStorage.getItem(user_key)) || [];

    if(x.length == 0)
    {
        table.innerHTML = "<tr><td colspan='6'>No Users Found</td></tr>";
        return;
    }
    else
    {
        table.innerHTML = "";

        for (let i = 0; i < x.length; i++) 
        {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${i+1}</td>
                            <td>${x[i].username || ""}</td>
                            <td>${x[i].email || ""}</td>
                            <td>${x[i].orders || 0}</td>
                            <td>${x[i].status == 1 ? "Active" : "Not Active"}</td>
                            <td>
                                <button style="margin: 4px;" class="btn btn-danger" onclick="block_user(${i})">Block</button>
                                <button style="margin: 4px;" class="btn btn-success" onclick="unblock_user(${i})">Unblock</button>
                                <button style="margin: 4px;" class="btn btn-danger" onclick="delete_user(${i})">Delete</button>
                            </td>`;

            table.appendChild(tr);
        }

    }

}

function block_user(index)
{
    
    if(confirm('Are you sure to block this user?'))
    {
        let x = JSON.parse(localStorage.getItem(user_key)) || [];

        x[index].status = 0;

        localStorage.setItem(user_key, JSON.stringify(x));

        alert('User Blocked');

        admin_get_users();
    }

}

function unblock_user(index)
{
    
    if(confirm('Are you sure to unblock this user?'))
    {
        let x = JSON.parse(localStorage.getItem(user_key)) || [];

        x[index].status = 1;

        localStorage.setItem(user_key, JSON.stringify(x));

        alert('User Unblocked');

        admin_get_users();
    }

}

function delete_user(index)
{
    
    if(confirm('Are you sure to delete this user?'))
    {
        let x = JSON.parse(localStorage.getItem(user_key)) || [];

        x.splice(index, 1);

        localStorage.setItem(user_key, JSON.stringify(x));

        alert('User Deleted');

        admin_get_users();
    }

}
