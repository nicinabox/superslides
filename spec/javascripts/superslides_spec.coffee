#= require jquery.min
#= require jquery.superslides

describe 'Superslides', ->
  beforeEach ->
    window.innerWidth = 800
    window.innerHeight = 600
    slide_html = '<div id="slides">
                    <ul>
                      <li><img src="http://placehold.it/800x600" width="800" height="600" alt=""></li>
                      <li><img src="http://placehold.it/800x600" width="800" height="600" alt=""></li>
                      <li><img src="http://placehold.it/800x600" width="800" height="600" alt=""></li>
                    </ul>
                    <nav class="slides-navigation">
                      <a href="#" class="next">Next</a>
                      <a href="#" class="prev">Previous</a>
                    </nav>
                  </div>'
    $('body').html(slide_html)
    $('#slides').superslides()
    

  it 'sets #slides ul width equal to the sum of all slides', ->
    expect($('#slides ul').width()).toEqual 2400

  describe 'each slide', ->    
    it 'should be window size', ->
      $('#slides li').each (i) ->
        expect($(this).height()).toEqual 600
        expect($(this).width()).toEqual 800

  describe 'window resize', ->
    beforeEach ->
      window.innerWidth = 1000
      window.innerHeight = 900
      $(window).resize()

    it 'adjusts #slides', ->
      expect($('#slides ul').width()).toEqual 3000

    it 'adjusts slide', ->
      $('#slides li').each (i) ->
        expect($(this).width()).toEqual 1000
        expect($(this).height()).toEqual 900

    describe 'slide image', ->    
      it 'removes inline width and height tags for scalability', ->
        $('#slides li').each (i) ->
          expect($('img', this).attr('width')).toBeUndefined()
          expect($('img', this).attr('height')).toBeUndefined()
        
      it 'vertically if window height is less than image height', ->                
        window.innerHeight = 500
        $(window).resize()
        $('#slides li').each (i) ->
          expect($('img', this).attr('style')).toMatch 'top: -50px'

      it 'horizontally if window width is less than image width', ->        
        window.innerWidth = 700
        $(window).resize()
        $('#slides li').each (i) ->
          expect($('img', this).attr('style')).toMatch 'left: -50px'

  describe 'navigation', ->
    it 'sets the current slide', ->
      expect($('#slides li').first().hasClass('current')).toBeTruthy()

    it 'can navigate next', ->
      $('#slides').superslides()
      $('.next').click()
      expect($('#slides .current').index()).toEqual 1

    it 'can navigate previous', ->
      $('#slides').superslides()
      $('.prev').click()
      expect($('#slides .current').index()).toEqual 2
