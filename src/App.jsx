
import React, { useReducer, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Users,
  UserRound,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxcnnZLZVgaU4p7sp2Dya-iuyUlja0-I6ypkn7TH3JgA&s=10";

const initialState = [
  {
    id: "2",
    name: "Abdulo",
    age: 30,
    status: false,
    img: defaultImg,
  },
  {
    id: "3",
    name: "Farhod",
    age: 15,
    status: true,
    img: defaultImg,
  },
  {
    id: "4",
    name: "Shahrom",
    age: 21,
    status: true,
    img: defaultImg,
  },
  {
    id: "5",
    name: "Amin",
    age: 12,
    status: true,
    img: defaultImg,
  },
  {
    id: "7bccFglHeRw",
    name: "Alijon",
    age: 17,
    status: true,
    img: defaultImg,
  },
];

function userReducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];

    case "EDIT_USER":
      return state.map((user) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload }
          : user
      );

    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);

    default:
      return state;
  }
}

export default function App() {
  const [users, dispatch] = useReducer(userReducer, initialState);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeUsers = users.filter((user) => user.status).length;
  const resetForm = () => {
    setName("");
    setAge("");
    setImg("");
    setEditId(null);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      const oldUser = users.find((user) => user.id === editId);
      dispatch({
        type: "EDIT_USER",
        payload: {
          id: editId,
          name: name.trim(),
          age: Number(age),
          img: img.trim() || oldUser?.img || defaultImg,
        },
      });
    } else {
      dispatch({
        type: "ADD_USER",
        payload: {
          id: Date.now().toString(),
          name: name.trim(),
          age: Number(age),
          status: false,
          img: img.trim() || defaultImg,
        },
      });
    }
    resetForm();
  };
  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setAge(String(user.age));
    setImg(user.img);
    setOpen(true);
  };
  const handleDelete = (id) => {
      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
      if (editId === id) {
        resetForm();
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3"><Users size={27} /></div>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl"> UserManager</h1>
              <p className="text-sm text-purple-100"> Идоракунии корбарон</p>
            </div>
          </div>

          <button onClick={() => { resetForm();setOpen(true);}}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-violet-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50" >
            <Plus size={20} />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-600">Dashboard</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ҳамаи корбарон
          </h2>

          <p className="mt-2 text-slate-500">Корбаронро илова, таҳрир ва идора кун.</p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-700">
              <Users size={25} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ҳамаи User</p>
              <h3 className="text-2xl font-bold">{users.length}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle2 size={25} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Active</p>
              <h3 className="text-2xl font-bold">{activeUsers}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <UserRound size={25} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Inactive</p>
              <h3 className="text-2xl font-bold">
                {users.length - activeUsers}
              </h3>
            </div>
          </div>
        </div>
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input
              type="text" placeholder="Ҷустуҷӯи User..."value={search}onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"/>
          </div>

          <p className="text-sm text-slate-500">
            Натиҷа:{" "}
            <span className="font-bold text-violet-700">
              {filteredUsers.length}
            </span>{" "}
            User
          </p>
        </div>
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100">
                <div className="h-24 bg-gradient-to-r from-violet-500 to-indigo-500" />
                <div className="px-5 pb-5">
                  <div className="-mt-12 mb-4 flex items-end justify-between">
                    <img
                      src={user.img || defaultImg}
                      alt={user.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultImg;
                      }}
                      className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-cover shadow-md"/>
                    <span
                      className={`mb-1 rounded-full px-3 py-1.5 text-xs font-bold ${
                        user.status
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {user.status ? "● Active" : "● Inactive"}
                    </span>
                  </div>

                  <h3 className="truncate text-xl font-bold">
                    {user.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    User ID: {user.id}
                  </p>

                  <div className="my-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Синну сол
                    </span>
                    <span className="font-bold text-slate-800">
                      {user.age} сол
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-50 py-3 font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white"
                    >
                      <Pencil size={17} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      aria-label={`Delete ${user.name}`}
                      className="flex items-center justify-center rounded-xl bg-rose-50 px-4 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Search className="mx-auto mb-4 text-slate-300" size={45} />
            <h3 className="text-xl font-bold">User ёфт нашуд!</h3>
            <p className="mt-2 text-slate-500">
              Номи дигарро ҷустуҷӯ кун.
            </p>
          </div>
        )}
      </main>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={resetForm}
        >
          <div
            className="my-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700">
                  {editId !== null ? (
                    <Pencil size={23} />
                  ) : (
                    <UserPlus size={23} />
                  )}
                </div>

                <h2 className="text-2xl font-bold">
                  {editId !== null ? "Edit User" : "Add New User"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Маълумоти корбарро пур кун.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Номи корбар
                </label>
                <input
                  type="text"
                  placeholder="Масалан: Habiba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Синну сол
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Масалан: 20"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Суроғаи расм (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {img.trim() && (
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <img
                    src={img}
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-14 w-14 rounded-xl object-cover" />
                  <p className="text-sm text-slate-500">Пешнамоиши расм</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 transition hover:bg-slate-50" > Cancel </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
                >
                  {editId !== null ? (
                    <>
                      <Pencil size={17} />
                      Save
                    </>
                  ) : (
                    <>
                      <Plus size={19} />
                      Add User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
