<?php while (have_posts()) : ?>
	<?php the_post(); ?>

<article class="post -is-horizontal -is-loading" id="articlePost">

  <div class="post__left article" id="articleSection">
		<div class="article__header" id="articleHeader">
			<div class="article__header-main">
				<h1 class="article__headline -f-headline-b"><?php  the_title(); ?></h1>
			</div>
		</div>

		<div class="article__content" id="articleContent">
		  <div class="article__main">
        <?php the_content(); ?>
      </div>
		</div>

	</div>

  <div class="post__right gallery" id="articleGallery">
	</div>

</article>

<?php endwhile; ?>
