<?php while (have_posts()) : ?>
	<?php the_post(); ?>

<article class="post -is-<?php echo get_field('layout') ?>" id="articlePost">
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
				<?php echo get_field('illustrator') ?>
			</p>
		</div>
		<div class="article__main">

			<?php the_content(); ?>

			<p class="article__footnote-title"><?php echo get_field('author_name') ?></p>
			<p><?php echo get_field('author_bio') ?></p>

		</div>
		</div>
	</div>
	<div class="post__right gallery">
		<?php if(get_field('layout') != "iframe"): ?>
			<div class="gallery__wrapper" id="galleryImg"></div>
		<?php endif; ?>
	</div>
</article>

<?php endwhile; ?>