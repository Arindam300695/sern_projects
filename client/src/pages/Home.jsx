/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import { addToCart } from "../store/cartSlice";
const baseUrl = "https://online-book-store-iktx.onrender.com";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [bookData, setbookData] = useState([]);
	const [user, setUser] = useState([]);

	useEffect(() => {
		const localStorageUser = localStorage.getItem("user");
		if (localStorageUser !== null) setUser([localStorageUser]);
		const fetchAllBooks = async () => {
			const response = await axios.get(`${baseUrl}/book/getBooks`);

			setTimeout(() => {
				setbookData(response.data);
			}, 3000);
		};
		fetchAllBooks();
		return () => {};
	}, []);

	// handleSubmit function
	const handleSubmit = (bookId) => {
		if (user.length !== 0) navigate(`/book/${bookId}`);
		else toast.warning("Please login first");
	};

	// addtoCartHandler function
	const addToCartHandler = (data) => {
		toast.success("Item added to cart");
		dispatch(addToCart(data));
	};

	return (
		<div>
			<Navbar />
			{bookData.length === 0 ? (
				<span className="w-screen h-screen">
					<img
						alt="loader"
						src={loader}
						className="m-auto mt-40 h-96"
					/>
				</span>
			) : (
				<div className="grid max-h-screen grid-cols-1 gap-5 overflow-y-scroll sm:grid-cols-2">
					{bookData.map((book) => (
						<div
							key={book.id}
							className="text-2xl md:text-base mt-2 mb-2 w-56 m-auto shadow-md shadow-[#27374D] p-5 transition-all duration-300 hover:scale-110"
						>
							<img
								alt="book"
								src={book.bookImageUrl}
								className="mb-2"
							/>
							<h2 className="mb-2 font-bold">{book.title}</h2>
							<hr />
							<h2 className="mb-2 font-semibold">
								{book.description}
							</h2>
							price:{" "}
							<h4 className="mb-2 font-semibold">
								${book.price}
							</h4>
							<div>
								<button
									className="p-2 mb-2 transition-all duration-300 bg-purple-400 border border-teal-900 rounded-md text-slate-900 hover:bg-red-400 hover:text-white hover:font-bold"
									onClick={() => {
										addToCartHandler({
											id: book.id,
											bookImageUrl: book.bookImageUrl,
											title: book.title,
											description: book.description,
											price: book.price,
											author: book.author,
										});
									}}
								>
									Add to Cart
								</button>
								<button
									className="border, border-teal-900 transition-all duration-300 bg-zinc-800 text-white rounded-md hover:bg-orange-300 hover:text-slate-800 hover:font-bold p-2"
									onClick={() => {
										handleSubmit(book.id);
									}}
								>
									Get Details
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
