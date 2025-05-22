const UserModal = ({toggleModal}) => {

  const clickClose = ()=>{
    toggleModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-500">👤 사용자 추가</h2>
        <form  className="space-y-4">
          <input type="text" placeholder="이름" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" />
          <input type="text" placeholder="사용자명" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" />
          <input type="email" placeholder="이메일" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" />
          <input type="text" placeholder="도시" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" />
          <input type="text" placeholder="회사명" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100" onClick={clickClose}>취소</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">저장</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UserModal;
