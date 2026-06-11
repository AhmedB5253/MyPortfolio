import asyncio
from playwright.async_api import async_playwright
import time

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Start timer
        start_time = time.time()

        await page.goto('http://localhost:3000')

        for i in range(1, 6):
            await asyncio.sleep(1)
            elapsed = time.time() - start_time
            # Try to get progress text
            progress_elem = await page.query_selector('.mono-text.text-md.font-bold')
            progress_text = await progress_elem.inner_text() if progress_elem else "Not found"

            # Check if hasLoadedGlobal is true
            has_loaded = await page.evaluate("() => sessionStorage.getItem('hasLoadedGlobal') === 'true'")
            print(f"[{elapsed:.1f}s] Progress: {progress_text}, hasLoaded: {has_loaded}")

            await page.screenshot(path=f'screenshot_{i}s.png')

            if has_loaded:
                print("Loading complete!")
                break

        await browser.close()

asyncio.run(main())
