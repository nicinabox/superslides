#= require jquery.min
#= require jquery.superslides
#= require jasmine-jquery

describe 'Superslides', ->
  beforeEach ->
    window.innerWidth = 800
    window.innerHeight = 600
    loadFixtures('slides-advanced.html')
    $('#slides').superslides()


  it 'wraps the contents in a control container', ->
    expect($('#slides').children()[0]).toEqual $('.slides-control')[0]

  it 'sets slides control width equal to the sum of all slides', ->
    expect($('#slides .slides-control').width()).toEqual 2400

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
      expect($('#slides .slides-control').width()).toEqual 3000

    it 'adjusts slide', ->
      $('#slides li').each (i) ->
        expect($(this).width()).toEqual 1000
        expect($(this).height()).toEqual 900

    describe 'slide image', ->
      # it 'removes inline width and height tags for scalability', ->
      #   $('#slides li').each (i) ->
      #     expect($('img', this).attr('width')).toBeUndefined()
      #     expect($('img', this).attr('height')).toBeUndefined()
      #
      # it 'adds data-original-width', ->
      #   $('#slides li').each (i) ->
      #     expect($('img', this).data('original-width')).toEqual 800
      #
      # it 'adds data-original-height', ->
      #   $('#slides li').each (i) ->
      #     expect($('img', this).data('original-height')).toEqual 600
      #
      # it 'vertically if window height is less than image height', ->
      #   window.innerHeight = 500
      #   $(window).resize()
      #   $('#slides li').each (i) ->
      #     expect($('img', this).attr('style')).toMatch 'top: -50px'
      #
      # it 'horizontally if window width is less than image width', ->
      #   window.innerWidth = 700
      #   $(window).resize()
      #   $('#slides li').each (i) ->
      #     expect($('img', this).attr('style')).toMatch 'left: -50px'

  describe 'events', ->
    it 'after initialization', ->
      spyOnEvent($('#slides'), 'slides.initialized')
      $('#slides').superslides()
      expect($('#slides')).toHandle('slides.initialized')

    it 'after animation', ->
      spyOnEvent($('#slides'), 'slides.animated')
      $('#slides').superslides()
      expect($('#slides')).toHandle('slides.animated')

    it 'after slide size set', ->
      spyOnEvent($('#slides'), 'slides.sized')
      $('#slides').superslides()
      expect($('#slides')).toHandle('slides.sized')

    it 'after image position adjusted', ->
      spyOnEvent($('#slides'), 'slides.image_adjusted')
      $('#slides').superslides()
      expect($('#slides')).toHandle('slides.image_adjusted')

  describe 'navigation', ->
    it 'sets the current slide', ->
      $('body').on('slides.initialized', '#slides', (e) ->
        expect($('#slides li').first().hasClass('current')).toBeTruthy()
      )

    it 'can navigate next', ->
      $('#slides').superslides()
      $('.next').click()
      $('body').on('slides.animated', '#slides', (e) ->
        expect($('#slides .current').index()).toEqual 1
      )

    it 'can navigate previous', ->
      $('#slides').superslides()
      $('.prev').click()
      $('body').on('slides.animated', '#slides', (e) ->
        expect($('#slides .current').index()).toEqual 2
      )
