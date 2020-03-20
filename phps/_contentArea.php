<div class="content-area" id="contentArea">

	<?php get_template_part( './phps/_menu' ); ?>

	<?php
		if(is_home()) { get_template_part( './phps/_content-homepage' ); }
		elseif(is_single()) { get_template_part( './phps/_content-single' ); }
		elseif(is_page()) { get_template_part( './phps/_content-page' ); }
	?>

</div>
