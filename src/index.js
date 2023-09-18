import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Screen(props) {
	return (
		<div className="screen">
			<p>{props.sub}</p>
			<h1>{props.title}</h1>
		</div>
	);
}

function Keyboard(props) {
	const keybord = [
		{ symbol: "C", color: "gray" },
		{ symbol: "+/-", color: "gray" },
		{ symbol: "%", color: "gray" },
		{ symbol: "/", color: "yellow" },
		{ symbol: "7", color: "white" },
		{ symbol: "8", color: "white" },
		{ symbol: "9", color: "white" },
		{ symbol: "*", color: "yellow" },
		{ symbol: "4", color: "white" },
		{ symbol: "5", color: "white" },
		{ symbol: "6", color: "white" },
		{ symbol: "-", color: "yellow" },
		{ symbol: "3", color: "white" },
		{ symbol: "2", color: "white" },
		{ symbol: "1", color: "white" },
		{ symbol: "+", color: "yellow" },
		{ symbol: "0", color: "white" },
		{ symbol: ".", color: "white" },
		{ symbol: "<", color: "white" },
		{ symbol: "=", color: "orange" },
	];

	return (
		<div className="keyboard">
			{keybord.map((el) => (
				<button
					key={el.symbol}
					className={el.color}
					onClick={() => props.handleClick(el.symbol)}
				>
					{el.symbol}
				</button>
			))}
		</div>
	);
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sub: "",
			title: "0",
		};
	}

	handleClick(i) {
		const num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
		const signs = ["/", "*", "-", "+", "%"];

		if (i === "C") {
			this.setState({ sub: "", title: "0" });
		}
		if (i === "+/-") {
			const newTitle =
				this.state.title[0] === "-"
					? this.state.title.slice(1)
					: "-" + this.state.title;
			this.setState({ title: newTitle });
		}
		if (i === "<") {
			const newTitle =
				this.state.title.length > 1
					? this.state.title.slice(0, this.state.title.length - 1)
					: "0";
			this.setState({ title: newTitle });
		}
		if (i === "=") {
			const newSub = this.state.sub + this.state.title + i;
			const newTitle = eval(this.state.sub + this.state.title).toFixed(2);

			this.setState({ sub: newSub, title: newTitle });
		}
		if (num.includes(i)) {
			const newTitle = this.state.title === "0" ? i : this.state.title + i;
			this.setState({ title: newTitle });
		}
		if (signs.includes(i)) {
			const newSub =
				this.state.title === "0"
					? this.state.sub
					: this.state.sub + this.state.title + i;
			this.setState({ sub: newSub, title: "0" });
		}
	}

	render() {
		return (
			<div className="calculator">
				<Screen sub={this.state.sub} title={this.state.title} />
				<Keyboard handleClick={(i) => this.handleClick(i)} />
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Calculator />
	</React.StrictMode>
);
