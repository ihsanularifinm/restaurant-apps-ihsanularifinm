class Hero extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<section class="hero">
				<div>
					<span>You hungry?</span>
					<article>
						<p>Explore local dishes with just one click.<br />Scratch daily and use only the best ingredients.</p>
						<a href="#dishes">Browse Dishes</a>
					</article>
				</div>
			</section>
		`;
	}
}

customElements.define('hero-header', Hero);
