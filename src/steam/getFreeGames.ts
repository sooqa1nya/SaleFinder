import * as cheerio from 'cheerio';

export const getFreeGames = async () => {
    const response = await fetch(process.env.STEAM_LINK!);
    const html = await response.text();

    const $ = cheerio.load(html);

    return $('a.search_result_row').map((_, el) => {
        const $row = $(el);
        const appId = $row.attr('data-ds-appid') || null;

        return {
            appId: appId,
            title: $row.find('.title').text().trim() || null,
            href: $row.attr('href') || null,
            img: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`, // $row.find('.search_capsule img').attr('src') || null,
            released: $row.find('.search_released').text().trim() || null,
            discountPct: $row.find('.discount_pct').text().trim() || null,
            originalPrice: $row.find('.discount_original_price').text().trim() || null,
            finalPrice: $row.find('.discount_final_price').text().trim() || null,
            reviewTooltip: $row.find('.search_review_summary').attr('data-tooltip-html')?.split('<br>').slice(0, 2).join('\n') || null
        };
    }).get();
};