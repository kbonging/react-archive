import React from "react";

const SearchForm = ({ toggleModal, search, onChangeSearch }) => {


  return (
    <form className="flex items-center gap-3 mt-4 max-w-xl mx-auto">
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        placeholder="이름,이메일로 검색"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
      <button type="submit" className="transition px-4 py-2 border rounded-lg hover:bg-slate-100">검색</button>
      <button
        type="button"
        onClick={toggleModal}
        className="transition px-4 py-2 border rounded-lg hover:bg-slate-100"
      >
        추가
      </button>
    </form>
  );
};

export default SearchForm;
