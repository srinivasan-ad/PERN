import React from "react";

function Login() {
  return (
    <div class="bg-blue-200 flex items-center justify-center h-screen">
      <div class="bg-white p-9 rounded-lg shadow-lg w-96">
        <h1 class="text-center font-bold mb-7">Login</h1>

        <form>

          <div>
            <label for="username" class="block text-sm font-medium text-grey-600">Username</label>
            <input type="username" id="username" name="username" class="mt-1 p-2 w-full border rounded-md"></input>
          </div>
          <div>
            <label for="password" class="block text-sm font-mediumtext-grey-600">Password</label>
            <input type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md"></input>
          </div>
          <button type="submit" class="bg-blue-500 text-white p-3 w-full rounded-md mt-5">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
