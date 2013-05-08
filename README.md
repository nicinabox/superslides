# Superslides (Text Hash)
[Superslides](https://github.com/nicinabox/superslides) is a full screen slider for jQuery heavily influenced by Nathan Searles' [SlidesJS](https://github.com/nathansearles/slides/). It's designed to be flexible, while maintaining a reasonable code base and good browser compatibility. I did not write this plugin, only modified for text-based hashes!

## Text Hash [(Demo)](http://jongacnik.com/dev/superslides/demo/#text-hash)

I recently used Superslides for a project but needed the ability to have text-based hashes rather than just numerical index. I've added this functionality.

## Usage

I will only explain here how to use the text-hash features, please check out the [main repository](https://github.com/nicinabox/superslides) for full usage instructions!

## Options

To enable text-based hashes, set the texthash option to true.

    texthash: true
    
## Markup

All that is required is to add a data-href to your slide with the text you would like as the hash.

    <div id="slides">
      <div class="slides-container">
        <img src="http://flickholdr.com/1000/800" alt="" data-href="text-hash-one">
        <img src="http://flickholdr.com/1000/800" alt="" data-href="text-hash-two">
      </div>
    </div>

Or with more sophisticated markup...

    <div id="slides">
      <ul class="slides-container">
        <li data-href="text-hash-thanks">
          <img src="http://flickholdr.com/1000/800" alt="">
          <div class="container">
            Slide one
          </div>
        </li>
        <li data-href="text-hash-please">
          <img src="http://flickholdr.com/1000/800/space" alt="">
          <div class="container">
            Slide two
          </div>
        </li>
        <li data-href="text-hash-now">
          <img src="http://flickholdr.com/1000/800/tech" alt="">
          <div class="container">
            Slide three
          </div>
        </li>
      </ul>
      <nav class="slides-navigation">
        <a href="#" class="next">Next</a>
        <a href="#" class="prev">Previous</a>
      </nav>
    </div>

## Not Fully Robust Yet

My addition breaks down if no data-href is present. Maybe I will add this. I also hope this might find it's way into the master branch.