import { useState, useEffect } from "react";

const UserModal = ({toggleModal, onCreateUser, onUpdateUser, editUser}) => {
  const isEdit = !!editUser;
  console.log(isEdit);

  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      city:""
    },
    company:{
      name:""
    }
  });

  useEffect(() => {
    if (editUser) {
      setInput(editUser);
    }
  }, [editUser]);


  const clickClose = ()=>{
    toggleModal();
  }

  const onInputChange = (e)=>{
    const {name, value} = e.target;
    if(name === "city"){
      setInput(prev => ({...prev, address:{...prev.address, city:value}}));
    }else if(name === "companyName"){
      setInput(prev => ({...prev, company:{...prev.company, name:value}}));
    }else{
      setInput(prev => ({...prev, [name]:value}));
    }
  }

  const onSubmit = ()=>{
    
    if(isEdit){
      onUpdateUser(input);
    }else{
      onCreateUser(input);
      
    }
    setInput({
      name: "",
      username: "",
      email: "",
      address: {
        city: ""
      },
      company:{
        name: ""
      }
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-500">
          {isEdit ? "✏ 사용자 수정" : "👤 사용자 추가"}
        </h2>
        <form  className="space-y-4">
          <input 
            type="text" 
            name="name"
            value={input.name}
            placeholder="이름" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" 
            onChange={onInputChange}
            
          />
          <input 
            type="text" 
            name="username" 
            value={input.username}
            placeholder="사용자명" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" 
            onChange={onInputChange}
          />
          <input 
            type="email" 
            name="email" 
            value={input.email}
            placeholder="이메일" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" 
            onChange={onInputChange}
          />
          <input 
            type="text" 
            name="city" 
            value={input.address.city}
            placeholder="도시" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" 
            onChange={onInputChange}
          />
          <input 
            type="text" 
            name="companyName" 
            value={input.company.name}
            placeholder="회사명" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" 
            onChange={onInputChange}
          />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100" onClick={clickClose}>취소</button>
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onSubmit}>저장</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UserModal;
