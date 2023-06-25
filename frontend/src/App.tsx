import React from "react";
import MyForm from "../src/components/MyForm";

interface User {
  id: number;
  name: string;
  age: number;
}

const App = () => {
  const [user, setUser] = React.useState<User[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <MyForm />
      <h1 className="text-2xl font-bold mb-4">CRUD</h1>
      <ul className="bg-white rounded-lg shadow-lg p-4">
        {user.map((user: User) => (
          <li key={user.id} className="py-2">
            {user.name} - {user.age} anos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
