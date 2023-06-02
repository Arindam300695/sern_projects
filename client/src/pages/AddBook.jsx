import axios from "axios";
import { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import addBook from "../assets/addBook.png";
import Navbar from "../components/Navbar";

const baseUrl = "http://localhost:8080";

const AddBook = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState("");
	const [bookData, setBookData] = useState({
		title: "",
		description: "",
		author: "",
		price: 0,
		bookImageUrl: "",
	});

	useEffect(() => {
		const localStorageToken = JSON.parse(localStorage.getItem("token"));
		if (localStorageToken === null) navigate("/");
		setToken(localStorageToken);
		return () => {};
	}, [navigate]);

	const handleChange = (event) => {
		setBookData({ ...bookData, [event.target.name]: event.target.value });
	};

	// handleSubmit function
	const handleSubmit = async () => {
		if (
			bookData.title === "" ||
			bookData.description === "" ||
			bookData.author === "" ||
			bookData.price === 0 ||
			bookData.bookImageUrl === ""
		)
			return toast.warning("All the fields are required");

		try {
			const res = await axios.post(`${baseUrl}/book/createBook`, bookData, {
				headers: { "Content-Type": "application/json", Authorization: token },
			});
			if (res.data.error) return toast.error(res.data.error);
			else {
				setTimeout(() => {
					navigate("/");
				}, 2000);
				return toast.success(res.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div>
			<Navbar />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
				<img src={addBook} alt="book" />
				<div className="mt-20 m-auto shadow-md p-5 w-64 flex justify-center flex-col rounded-md shadow-[#0C134F]">
					{/* title field */}
					<input
						type="text"
						name="title"
						placeholder="title"
						value={bookData.title}
						className="mb-4 p-5 focus:outline-none border-b border-b-slate-900 transition-all duration-500 hover:scale-110"
						onChange={handleChange}
					/>
					{/* description field */}
					<input
						type="text"
						name="description"
						placeholder="description"
						value={bookData.description}
						className="mb-4 p-5 focus:outline-none border-b border-b-slate-900 transition-all duration-500 hover:scale-110"
						onChange={handleChange}
					/>
					{/* author field */}
					<input
						type="text"
						name="author"
						placeholder="author"
						value={bookData.author}
						className="mb-4 p-5 focus:outline-none border-b border-b-slate-900 transition-all duration-500 hover:scale-110"
						onChange={handleChange}
					/>
					{/* price field */}
					<input
						type="number"
						name="price"
						placeholder="price"
						value={bookData.price}
						className="mb-4 p-5 focus:outline-none border-b border-b-slate-900 transition-all duration-500 hover:scale-110"
						onChange={handleChange}
					/>
					{/* book image url field */}
					<input
						type="text"
						name="bookImageUrl"
						placeholder="bookImageUrl"
						value={bookData.bookImageUrl}
						className="mb-4 p-5 focus:outline-none border-b border-b-slate-900 transition-all duration-500 hover:scale-110"
						onChange={handleChange}
					/>
					<button
						className="border-2 border-black p-2 rounded-lg font-semibold flex justify-center transition-all duration-300 hover:translate-x-3 items-center gap-2 hover:bg-slate-900 hover:text-white"
						onClick={handleSubmit}>
						confirm <GiConfirmed className="text-xl text-green-600" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
