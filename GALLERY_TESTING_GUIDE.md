# Gallery Testing Guide

## Quick Test Instructions

### 1. Open Gallery Page
Open `gallery.html` in your browser to test the new interactive features.

### 2. Desktop Testing

#### Basic Functionality
- [ ] Click any gallery image - should open lightbox
- [ ] Click Previous/Next buttons - should navigate between images
- [ ] Click X button (top right) - should close lightbox
- [ ] Click dark backdrop - should close lightbox

#### Keyboard Controls
- [ ] Press `→` (Right Arrow) - next image
- [ ] Press `←` (Left Arrow) - previous image
- [ ] Press `Escape` - close lightbox
- [ ] Press `+` or `=` - zoom in
- [ ] Press `-` or `_` - zoom out

#### Visual Elements
- [ ] Image counter shows "1 / 8", "2 / 8", etc.
- [ ] Caption displays at bottom of lightbox
- [ ] Loading spinner appears briefly when loading images
- [ ] Hover over gallery images shows zoom icon and "Click to enlarge"
- [ ] Gallery images scale up smoothly on hover

### 3. Mobile Testing (or use browser DevTools mobile view)

#### Touch Gestures
- [ ] Tap any gallery image - opens lightbox
- [ ] Swipe left - next image
- [ ] Swipe right - previous image
- [ ] Tap backdrop - closes lightbox

#### Responsive Design
- [ ] Gallery grid shows 1 column on mobile
- [ ] Gallery grid shows 2 columns on tablet
- [ ] Gallery grid shows 3-4 columns on desktop
- [ ] All buttons are easily tappable
- [ ] Text is readable on small screens

### 4. Browser Compatibility
Test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### 5. Performance Check
- [ ] Images load quickly
- [ ] Animations are smooth (no lag)
- [ ] No console errors
- [ ] Page scrolls smoothly

---

## Expected Behavior

### Gallery Grid
- 8 images displayed in responsive grid
- Hover shows gradient overlay with zoom icon
- Smooth scale animation on hover
- Professional shadows and rounded corners

### Lightbox Features
- **Navigation**: Previous/Next buttons, keyboard arrows, swipe gestures
- **Zoom**: +/- buttons, keyboard shortcuts
- **Close**: X button, Escape key, backdrop click
- **Info**: Image counter (e.g., "3 / 8"), caption at bottom
- **Loading**: Spinner while image loads
- **Animation**: Smooth fade-in/out transitions

### Image Captions
1. "Environmental Consultancy Project - ETP/STP Installation"
2. "Pollution Control System Installation"
3. "Water Treatment Plant - RO System"
4. "Industrial Environmental Compliance Project"
5. "Sewage Treatment Plant Installation"
6. "Air Pollution Control System"
7. "MPCB Compliance & Environmental Audit"
8. "Zero Liquid Discharge (ZLD) System"

---

## Troubleshooting

### Issue: Lightbox doesn't open
- **Check**: Is `assets/js/gallery.js` loaded? (Check browser console)
- **Fix**: Ensure script tag is present before `</body>`

### Issue: Images don't navigate
- **Check**: Are `data-gallery-item` attributes present on gallery items?
- **Fix**: Verify HTML structure matches the updated format

### Issue: Zoom doesn't work
- **Check**: Browser console for JavaScript errors
- **Fix**: Ensure gallery.js is loaded correctly

### Issue: Mobile swipe not working
- **Check**: Test on actual mobile device (not just DevTools)
- **Fix**: Touch events may not work in some desktop browsers

---

## Browser DevTools Testing

### Open DevTools
- **Chrome/Edge**: F12 or Ctrl+Shift+I
- **Firefox**: F12 or Ctrl+Shift+I
- **Safari**: Cmd+Option+I (enable Developer menu first)

### Check Console
Look for any errors (should be none):
```
✅ No errors = Gallery working correctly
❌ Errors = Check file paths and syntax
```

### Test Mobile View
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Test touch gestures with mouse

---

## Performance Metrics

### Expected Load Times
- **Gallery Page**: < 2 seconds
- **Lightbox Open**: < 100ms
- **Image Load**: < 500ms (depends on image size)
- **Navigation**: Instant (< 50ms)

### Optimization Features
- ✅ Lazy loading on gallery images
- ✅ CSS transforms (hardware accelerated)
- ✅ No external dependencies
- ✅ Efficient event handling

---

## Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements accessible via Tab key
- [ ] Arrow keys work for navigation
- [ ] Escape key closes lightbox
- [ ] Focus visible on buttons

### Screen Reader
- [ ] Alt text present on all images
- [ ] ARIA labels on buttons
- [ ] Captions provide context

---

## Success Criteria

✅ **PASS** if:
- All gallery images are clickable
- Lightbox opens and displays images correctly
- Navigation works (buttons, keyboard, touch)
- Zoom functionality works
- Lightbox closes properly
- No console errors
- Smooth animations
- Responsive on all screen sizes

❌ **FAIL** if:
- Images don't open in lightbox
- Navigation doesn't work
- Console shows errors
- Animations are laggy
- Not responsive on mobile

---

## Quick Test Checklist

```
Desktop:
[ ] Click image → Opens lightbox
[ ] Arrow keys → Navigate
[ ] +/- keys → Zoom
[ ] Escape → Close
[ ] Hover → Shows overlay

Mobile:
[ ] Tap image → Opens lightbox
[ ] Swipe → Navigate
[ ] Tap backdrop → Close
[ ] Responsive grid

Visual:
[ ] Counter shows (e.g., "1 / 8")
[ ] Caption displays
[ ] Loading spinner appears
[ ] Smooth animations
[ ] Professional styling
```

---

**Ready to test!** Open `gallery.html` in your browser and follow this guide.
