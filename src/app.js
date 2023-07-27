import './style.scss';

const URL =
	'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

function getFormattedDate(dateStr) {
	return new Date(dateStr).toLocaleString('en-UK', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

fetch(URL)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		console.log(data);
		data.forEach((post) => {
			const postHTML = `
				<div class="col-3">
					<div class="p-card u-no-padding">
						<div class="card-content">
							<p class="card-label">CLOUD AND SERVER</p>
							<img
								class="p-card__image"
								src="${post.featured_media}"
							/>
							<div class="p-card__inner u-no-padding">
								<a href="${post.link}" class="post-link">
									<h4 class="is-accent u-no-padding">
										${post.title.rendered}
									</h4>
								</a>
								<p class="p-heading--6 u-no-padding">
									By <a class="author-link" href="${post._embedded.author[0].link}">
									${post._embedded.author[0].name}</a> on ${getFormattedDate(post.date)}
								</p>
							</div>
							<hr class="dotted-separator" />
							<div class="p-card__inner u-no-padding">
								Article
							</div>
						</div>
					</div>
				</div>
			`;
			document
				.querySelector('#posts-container')
				.insertAdjacentHTML('beforeend', postHTML);
		});
	});
