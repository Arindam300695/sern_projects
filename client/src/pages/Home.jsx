import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loader from "../assets/loader.gif";
import Navbar from "../components/Navbar";
import { addToCart } from "../store/cartSlice";
const baseUrl = "http://localhost:8080";

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
			// console.log(response.data);
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
				<span className="h-screen w-screen">
					<img alt="loader" src={loader} className="m-auto mt-40 h-96" />
				</span>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-screen overflow-y-scroll">
					{bookData.map((book) => (
						<div
							key={book.id}
							className="text-2xl md:text-base mt-2 mb-2 w-56 m-auto shadow-md shadow-[#27374D] p-5 transition-all duration-300 hover:scale-110">
							<img alt="book" src={book.bookImageUrl} className="mb-2" />
							<h2 className="font-bold mb-2">{book.title}</h2>
							<hr />
							<h2 className="font-semibold mb-2">{book.description}</h2>
							price: <h4 className="font-semibold mb-2">${book.price}</h4>
							<div>
								<button
									className="border border-teal-900 p-2 mb-2 transition-all duration-300 bg-purple-400 text-slate-900 rounded-md hover:bg-red-400 hover:text-white hover:font-bold"
									onClick={() => {
										addToCartHandler({
											id: book.id,
											bookImageUrl: book.bookImageUrl,
											title: book.title,
											description: book.description,
											price: book.price,
											author: book.author,
										});
									}}>
									Add to Cart
								</button>
								<button
									className="border, border-teal-900 transition-all duration-300 bg-zinc-800 text-white rounded-md hover:bg-orange-300 hover:text-slate-800 hover:font-bold p-2"
									onClick={() => {
										handleSubmit(book.id);
									}}>
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
