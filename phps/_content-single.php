<?php while (have_posts()) : ?>
	<?php the_post(); ?>

<article class="post <?php if( get_field('layout') == 'horizontal'): ?>-is-horizontal<?php endif; ?>" id="articlePost">
	<div class="post__left article" id="articleSection">
		<div class="article__header" id="articleHeader">
			<div class="article__header-main">
				<h1 class="article__headline -f-headline-b"><?php  the_title(); ?></h1>
				<p class="article__author -f-headline"><?php echo get_field('author_name') ?></p>
			</div>
			<div class="article__header-sub">
				<span class="article__headline -f-title"><?php  the_title(); ?></span>
				<span class="article__author -f-title">By <?php echo get_field('author_name') ?></span>
			</div>
		</div>
		<div class="article__content" id="articleContent">
		<div class="article__intro">
			<p class="article__blurb -f-paragraph -f-bold">
				<?php echo get_field('blurb') ?>
			</p>
			<p class="article__illustrator -f-illustrator">
				Illustrated by <?php echo get_field('illustrator') ?>
			</p>
		</div>
		<div class="article__main">

			<!-- <span class="article__caption" data-src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image.jpg">1 Image Caption: Human unsure of life and self enjoying sunset.</span>
			<figure>
				<img src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image.jpg" alt="1 Image Caption: Human unsure of life and self enjoying sunset.">
				<figcaption>1 Image Caption: Human unsure of life and self enjoying sunset.</figcaption>
			</figure>


			<p>
				Computer worlds, like those of children’s make-believe, grant absolute power to whoever is imagining or programming them (2). As reality is drafted into digital environments, the computer simulation offers the opportunity to create worlds and bodies without unwanted complexity. It allows us to devise private games and internally consistent worlds in the face of absurdity and paradox. Advances in computer imaging technology towards “photorealism” further seduce us into believing that we are looking at concrete realities rather than ideological assemblages of math and code. As reality is increasingly reflected through the small mirrors of digital simulation, we risk losing sight of the mysterious nature of our lived reality.
			</p>

			<div class="article__quote-block">
				<q class="article__quote">This is not an essay about technology, so much as it is about entropy.</q>
				<span class="article__quote-author">Michelle Shevin</span>
			</div>

			<p>
				Computer worlds, like those of children’s make-believe, grant absolute power to whoever is imagining or programming them (2). As reality is drafted into digital environmenlts, the computer simulation offers the opportunity to create worlds and bodies without unwanted complexity. It allows us to devise private games and internally consistent worlds in the face of absurdity and paradox. Advances in computer imaging technology towards “photorealism” further seduce us into believing that we are looking at concrete realities rather than ideological assemblages of math and code. As reality is increasingly reflected through the small mirrors of digital simulation, we risk losing sight of the mysterious nature of our lived reality.
			</p>

			<span class="article__caption" data-src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image-2-1.jpg">2 Image Caption: Human unsure of life and self enjoying sunset.</span>
			<figure>
				<img src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image-2-1.jpg" alt="2 Image Caption: Human unsure of life and self enjoying sunset.">
				<figcaption>2 Image Caption: Human unsure of life and self enjoying sunset.</figcaption>
			</figure>

			<p>
				Computer worlds, like those of children’s make-believe, grant absolute power to whoever is imagining or programming them (2). As reality is drafted into digital environments, the computer simulation offers the opportunity to create worlds and bodies without unwanted complexity. It allows us to devise private games and internally consistent worlds in the face of absurdity and paradox. Advances in computer imaging technology towards “photorealism” further seduce us into believing that we are looking at concrete realities rather than ideological assemblages of math and code. As reality is increasingly reflected through the small mirrors of digital simulation, we risk losing sight of the mysterious nature of our lived reality.
			</p>

			<ul>
				<li>black beans</li>
				<li>black beans</li>
				<li>black beans</li>
				<li>black beans</li>
			</ul>

			<hr>

			<h2>III.</h2>

			<p>
				Computer worlds, like those of children’s make-believe, grant absolute power to whoever is imagining or programming them (2). As reality is drafted into digital environments, the computer simulation offers the opportunity to create worlds and bodies without unwanted complexity. It allows us to devise private games and internally consistent worlds in the face of absurdity and paradox. Advances in computer imaging technology towards “photorealism” further seduce us into believing that we are looking at concrete realities rather than ideological assemblages of math and code. As reality is increasingly reflected through the small mirrors of digital simulation, we risk losing sight of the mysterious nature of our lived reality.
			</p>

			<span class="article__caption" data-src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image-2.jpg">3 Image Caption: Human unsure of life and self enjoying sunset.</span>
			<figure>
				<img src="https://itp.nyu.edu/adjacent/issue-7/wp-content/uploads/sites/12/2020/05/vertical-image-2.jpg" alt="3 Image Caption: Human unsure of life and self enjoying sunset.">
				<figcaption>3 Image Caption: Human unsure of life and self enjoying sunset.</figcaption>
			</figure> -->

			<?php the_content(); ?>

			<div class="article__footer">
				<hr>
				<p class="article__footnote-title -f-title">Footnotes</p>
				<div class="article__footnotes">
					<?php echo get_field('footnotes'); ?>
					<!-- <p class="article__footnote">1. Sum, Lok-kei, “Row over Extradition Bill Grows as Legco Legal Adviser Questions Proposal,” South China Morning Post, 4 May, 2019</p> -->
				</div>

				<p class="article__footnote-title -f-title"><?php echo get_field('author_name') ?></p>
				<p><?php echo get_field('author_bio') ?></p>
			</div>

		</div>
		</div>
	</div>
	<?php if( get_field('layout') != 'horizontal'): ?>
	<div class="post__right gallery">
		<div class="gallery__wrapper" id="galleryImg"></div>
	</div>
	<?php endif; ?>
</article>

<?php endwhile; ?>