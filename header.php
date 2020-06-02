<!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>
		<?php if (is_single()) : ?>
			<title> <?php the_title(); ?> </title>
			<meta name="title" content="<?php the_title(); ?>">
			<meta name="description" content="<?php echo get_field('blurb') ?>">
		<?php else: ?>
			<title> ADJACENT Issue 7 : Feelings </title>
			<meta name="title" content="ADJACENT Issue 7 : Feelings">
			<meta name="description" content="Our intent in Feeling was to explore both the ways in which our everyday emotions have been tied into the technical infrastructure around us, and the way in which that infrastructure, which is increasingly moving toward a network of ubiquitous sensing technology, will create new ways of existing in the world.">
		<?php endif; ?>


		<!-- Standard Favicon -->
	  <link rel="icon" type="image/x-icon" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/favicon.ico" />
		<link rel="icon" sizes="192x192" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/android-chrome-192x192.png">
		<link rel="icon" sizes="512x512" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/android-chrome-512x512.png">
		<link rel="icon" sizes="16x16" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/favicon-16x16.png">
		<link rel="icon" sizes="32x32" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/favicon-32x32.png">
	  <link rel="apple-touch-icon-precomposed" href="<?php echo get_bloginfo('template_directory'); ?>/public/favicon_io/apple-touch-icon.png">


		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >
		<link href="<?php echo get_bloginfo('template_directory'); ?>/style.css" rel="stylesheet">

	</head>
