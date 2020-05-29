<?php while (have_posts()) : ?>
	<?php the_post(); ?>

<article class="post -is-<?php echo get_field('layout') ?> -is-loading" id="articlePost">
	<div class="post__left article" id="articleSection">
		<div class="article__header" id="articleHeader">
			<div class="article__header-main">
				<h1 class="article__headline -f-headline-b"><?php  the_title(); ?></h1>
				<p class="article__author -f-headline"><?php echo get_field('author_name') ?></p>
			</div>
			<div class="article__illustrator -f-illustrator">
				<?php the_field('illustrator') ?>
			</div>
		</div>
		<div class="article__content" id="articleContent">
		<div class="article__intro">
			<p class="article__blurb -f-paragraph -f-bold">
				<?php echo get_field('blurb') ?>
			</p>
		</div>
		<div class="article__main">

		<?php if(get_field('layout') == 'iframe'): ?>
			<div class="video-holder -is-iframe-layout">
				<iframe src="<?php the_field('side_video'); ?>" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
			</div>
		<?php endif; ?>

			<?php the_content(); ?>

			<p class="article__footnote-title"><?php echo get_field('author_name') ?></p>
			<?php the_field('author_bio') ?>

		</div>
		</div>
	</div>
	<div class="post__right gallery" id="articleGallery">
		<?php if(get_field('layout') != "iframe"): ?>
			<div class="gallery__wrapper" id="galleryImg"></div>
		<?php else: ?>
			<div class="gallery__wrapper">
				<div style="padding:176.94% 0 0 0;position:relative;"><iframe src="<?php the_field('side_video'); ?>?autoplay=1&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
			</div>
		<?php endif; ?>
	</div>
</article>

<?php endwhile; ?>