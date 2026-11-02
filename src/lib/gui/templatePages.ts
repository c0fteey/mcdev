// Pages for the template library, as supplied for this project.

export const TEMPLATE_PAGES: Record<string, string> = {
  "menu.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:refresh" content="5">
    <meta name="ui:open-sound" content="item.book.page_turn">
    <title>SERVER MENU</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .hub-panel {
        width: 600px;
      }
      .player-head {
        width: 48px;
        height: 48px;
        image-rendering: pixelated;
      }
      .player-row {
        align-items: center;
      }
      .player-info {
        flex: 1;
        min-width: 0;
      }
      .player-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .online-info {
        align-items: flex-end;
      }
      .hub-button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        padding-left: 8px;
        padding-right: 8px;
      }
      .button-text {
        flex: 1;
        text-align: left;
      }
      .footer-button {
        width: 196px;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title cf big">SERVER MENU</div>
      <div class="mc-panel hub-panel">
        <div class="mc-well">
          <div class="mc-row player-row">
            <img class="player-head" src="head:{player}" alt="Player face">
            <div class="mc-col player-info">
              <div class="cf player-name">{player}</div>
              <div class="ca">Level {level}</div>
            </div>
            <div class="mc-col online-info">
              <div class="cf">Players online</div>
              <div class="ca">{online}<span class="c7"> / {max}</span></div>
            </div>
          </div>
        </div>
        <div class="label">Your next adventure starts here.</div>
        <div class="mc-col">
          <a class="mc-btn hub-button" href="rewards.html" data-key="1">
            <i class="mc-icon i-chest"></i>
            <span class="button-text">Daily Rewards</span>
            <span class="mc-key">1</span>
          </a>
          <a class="mc-btn hub-button" href="kits.html" data-key="2">
            <i class="mc-icon i-pickaxe"></i>
            <span class="button-text">Kits</span>
            <span class="mc-key">2</span>
          </a>
          <a class="mc-btn hub-button" href="profile.html" data-key="3">
            <i class="mc-icon i-book"></i>
            <span class="button-text">Profile</span>
            <span class="mc-key">3</span>
          </a>
        </div>
      </div>
      <div class="mc-row">
        <button class="mc-btn footer-button" data-action="close" data-key="q">Done <span class="mc-key">Q</span></button>
      </div>
      <div class="mc-hint c7 small">Press 1–3 to explore • Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "rewards.html": String.raw`<!doctype html>
<html>
  <head>
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="item.book.page_turn">
    <title>Daily Rewards</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .rewards-panel {
        width: 640px;
      }
      .reward-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
      }
      .reward-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .today-slot {
        outline: 2px solid #ffff55;
        outline-offset: 2px;
      }
      .reward-summary {
        justify-content: space-between;
        align-items: center;
      }
      .claim-row {
        justify-content: center;
      }
      .reward-heading {
        align-items: center;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">

      <div class="mc-title">Daily Rewards</div>

      <div class="mc-panel rewards-panel">
        <div class="mc-row reward-summary">
          <span class="label">Your weekly rewards</span>
          <span class="label">Streak: 3 days</span>
        </div>

        <div class="mc-well mc-col">
          <div class="mc-row reward-summary">
            <span class="ce">Day 4 is ready!</span>
            <span class="c7 small">Hover a slot for details</span>
          </div>

          <div class="reward-days">
            <div class="reward-day">
              <span class="c7">Day 1</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-bread"></i>
                <span class="n">16</span>
                <div class="mc-tooltip">
                  <div class="cf">A Fresh Start</div>
                  <div class="c7">16 Bread</div>
                  <div class="ca">Claimed</div>
                </div>
              </div>
              <span class="ca small">✓</span>
            </div>

            <div class="reward-day">
              <span class="c7">Day 2</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-emerald"></i>
                <span class="n">8</span>
                <div class="mc-tooltip">
                  <div class="cf">Pocket Money</div>
                  <div class="ca">8 Emeralds</div>
                  <div class="ca">Claimed</div>
                </div>
              </div>
              <span class="ca small">✓</span>
            </div>

            <div class="reward-day">
              <span class="c7">Day 3</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-gold"></i>
                <span class="n">16</span>
                <div class="mc-tooltip">
                  <div class="ce">Golden Days</div>
                  <div class="c6">16 Gold Ingots</div>
                  <div class="ca">Claimed</div>
                </div>
              </div>
              <span class="ca small">✓</span>
            </div>

            <div class="reward-day">
              <span class="ce">Day 4</span>
              <div class="mc-slot big tip today-slot">
                <i class="mc-icon i-diamond"></i>
                <span class="n">4</span>
                <div class="mc-tooltip">
                  <div class="cb">Diamond Discovery</div>
                  <div class="cf">4 Diamonds</div>
                  <div class="ce">Ready to claim today!</div>
                </div>
              </div>
              <span class="ce small">Today</span>
            </div>

            <div class="reward-day">
              <span class="cf">Day 5</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-emerald"></i>
                <span class="n">24</span>
                <div class="mc-tooltip">
                  <div class="ce">Growing Fortune</div>
                  <div class="ca">24 Emeralds</div>
                  <div class="c7">Keep your streak to unlock</div>
                </div>
              </div>
              <span class="c7 small">Locked</span>
            </div>

            <div class="reward-day">
              <span class="cf">Day 6</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-apple"></i>
                <span class="n">32</span>
                <div class="mc-tooltip">
                  <div class="cf">Harvest Haul</div>
                  <div class="cf">32 Apples</div>
                  <div class="c7">Keep your streak to unlock</div>
                </div>
              </div>
              <span class="c7 small">Locked</span>
            </div>

            <div class="reward-day">
              <span class="cd">Day 7</span>
              <div class="mc-slot big tip">
                <i class="mc-icon i-key"></i>
                <div class="mc-tooltip">
                  <div class="cd">Weekly Treasure</div>
                  <div class="cf">1 Epic Crate Key</div>
                  <div class="c7">Complete your week to unlock</div>
                </div>
              </div>
              <span class="cd small">Bonus</span>
            </div>
          </div>
        </div>

        <div class="mc-well mc-col">
          <div class="mc-row reward-heading">
            <i class="mc-icon i-diamond"></i>
            <span class="cf">Today's reward: <span class="cb">4 Diamonds</span></span>
          </div>
          <span class="c7">Claim each day to keep your streak going.</span>
          <div class="mc-bar" style="--v: .4286"><i></i></div>
          <span class="c7 small">3 of 7 days claimed • Weekly bonus on Day 7</span>
        </div>

        <div class="mc-row claim-row">
          <button class="mc-btn wide" data-command="daily claim" data-key="1">
            Claim Reward <span class="mc-key">1</span>
          </button>
        </div>
      </div>


      <div class="mc-hint">Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "kits.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="item.book.page_turn">
    <title>Kits</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .kits-panel {
        width: 864px;
      }
      .kit-row {
        display: grid;
        grid-template-columns: 144px 252px 192px 112px;
        gap: 12px;
        align-items: center;
        padding: 8px;
      }
      .kit-name {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .kit-slots {
        display: flex;
        gap: 0;
      }
      .kit-status {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .kit-claim {
        width: 112px;
      }
      .panel-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title big cf">Kits</div>
      <div class="mc-panel kits-panel">
        <div class="panel-heading">
          <span class="label">Supplies for your next adventure</span>
          <span class="label small">2 kits ready</span>
        </div>
        <div class="mc-well kit-row">
          <div class="kit-name">
            <span class="cf">Starter</span>
            <span class="c7 small">The essentials</span>
          </div>
          <div class="kit-slots">
            <div class="mc-slot tip">
              <i class="mc-icon i-bread"></i>
              <span class="n">16</span>
              <div class="mc-tooltip">
                <div class="cf">Bread</div>
                <div class="c7">16 items</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-pickaxe"></i>
              <div class="mc-tooltip">
                <div class="cf">Stone Pickaxe</div>
                <div class="c7">1 item</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-sword"></i>
              <div class="mc-tooltip">
                <div class="cf">Stone Sword</div>
                <div class="c7">1 item</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <span class="c6">T</span>
              <span class="n">32</span>
              <div class="mc-tooltip">
                <div class="cf">Torch</div>
                <div class="c7">32 items</div>
              </div>
            </div>
          </div>
          <div class="kit-status">
            <span class="ca">Ready to claim</span>
            <span class="c7 small">Cooldown: 24 hours</span>
          </div>
          <button class="mc-btn kit-claim" data-command="kit starter" data-close data-sound="entity.experience_orb.pickup 1 1">Claim</button>
        </div>
        <div class="mc-well kit-row">
          <div class="kit-name">
            <span class="cf">Miner</span>
            <span class="c7 small">Dig a little deeper</span>
          </div>
          <div class="kit-slots">
            <div class="mc-slot tip">
              <i class="mc-icon i-pickaxe"></i>
              <div class="mc-tooltip">
                <div class="cf">Iron Pickaxe</div>
                <div class="c7">1 item</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <span class="c6">T</span>
              <span class="n">64</span>
              <div class="mc-tooltip">
                <div class="cf">Torch</div>
                <div class="c7">64 items</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-bread"></i>
              <span class="n">24</span>
              <div class="mc-tooltip">
                <div class="cf">Bread</div>
                <div class="c7">24 items</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-potion"></i>
              <span class="n">2</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Night Vision</div>
                <div class="c7">2 potions • 8:00 each</div>
              </div>
            </div>
          </div>
          <div class="kit-status">
            <span class="ce">On cooldown</span>
            <span class="c7 small">Daily reset • 00:00 UTC</span>
          </div>
          <button class="mc-btn off kit-claim" disabled>Wait</button>
        </div>
        <div class="mc-well kit-row">
          <div class="kit-name">
            <span class="cf">Warrior</span>
            <span class="c7 small">Hold your ground</span>
          </div>
          <div class="kit-slots">
            <div class="mc-slot tip">
              <i class="mc-icon i-sword"></i>
              <div class="mc-tooltip">
                <div class="cf">Iron Sword</div>
                <div class="c7">1 item</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-shield"></i>
              <div class="mc-tooltip">
                <div class="cf">Shield</div>
                <div class="c7">1 item</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-bread"></i>
              <span class="n">16</span>
              <div class="mc-tooltip">
                <div class="cf">Bread</div>
                <div class="c7">16 items</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-potion-red"></i>
              <span class="n">2</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Healing</div>
                <div class="c7">2 potions • Instant Health II</div>
              </div>
            </div>
          </div>
          <div class="kit-status">
            <span class="ca">Ready to claim</span>
            <span class="c7 small">Cooldown: 48 hours</span>
          </div>
          <button class="mc-btn kit-claim" data-command="kit warrior" data-close data-sound="entity.experience_orb.pickup 1 1">Claim</button>
        </div>
        <div class="mc-well kit-row">
          <div class="kit-name">
            <span class="cf">Alchemist</span>
            <span class="c7 small">Bottled advantage</span>
          </div>
          <div class="kit-slots">
            <div class="mc-slot tip">
              <i class="mc-icon i-potion-red"></i>
              <span class="n">4</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Healing</div>
                <div class="c7">4 potions • Instant Health II</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-potion-gold"></i>
              <span class="n">2</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Fire Resistance</div>
                <div class="c7">2 potions • 8:00 each</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-potion-green"></i>
              <span class="n">2</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Swiftness</div>
                <div class="c7">2 potions • 8:00 each</div>
              </div>
            </div>
            <div class="mc-slot tip">
              <i class="mc-icon i-potion-pink"></i>
              <span class="n">2</span>
              <div class="mc-tooltip">
                <div class="cf">Potion of Strength</div>
                <div class="c7">2 potions • 8:00 each</div>
              </div>
            </div>
          </div>
          <div class="kit-status">
            <span class="cc">Locked</span>
            <span class="c7 small">Requires Alchemist rank</span>
          </div>
          <button class="mc-btn off kit-claim" disabled>Locked</button>
        </div>
        <span class="label small">Hover over supplies for details. Make room in your inventory before claiming.</span>
      </div>
      <div class="mc-row">
        <a class="mc-btn half" href="menu.html">Back to Menu</a>
      </div>
      <div class="mc-hint c7 small">Q or Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "profile.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="item.armor.equip_leather">
    <title>Profile</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .profile-panel {
        width: 820px;
      }
      .profile-top {
        display: grid;
        grid-template-columns: 236px 1fr;
        gap: 12px;
      }
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        text-align: center;
        min-width: 0;
      }
      .card>span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .card img {
        width: 80px;
        height: 80px;
        image-rendering: pixelated;
      }
      .tag {
        padding: 0 6px 2px;
        background: #5a2a8a;
        border: 2px solid #000;
        box-shadow: inset 2px 2px 0 #8a5ac0;
      }
      .card .mc-bar {
        width: 100%;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .stat .mc-col {
        min-width: 0;
        gap: 2px;
      }
      .stat .cf {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .stat {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .badges-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .badges {
        display: flex;
      }
      .badges .locked {
        background: #6b6b6b;
      }
      .tip-left>.mc-tooltip {
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: 8px;
      }
      .tip-up>.mc-tooltip {
        top: auto;
        bottom: 100%;
        margin-bottom: 4px;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title big cf">Profile</div>
      <div class="mc-panel profile-panel">
        <div class="profile-top">
          <div class="mc-well card">
            <img src="head:{player}" alt="">
            <span class="cf">{player}</span>
            <span class="tag cf small">%luckperms_primary_group_name%</span>
            <div class="mc-bar" style="--v:.64"><i></i></div>
            <span class="ca small">Level {level} • 64%</span>
          </div>
          <div class="mc-col">
            <div class="mc-spread"><span class="label">This season</span><span class="label small">Joined 14 Feb 2026</span></div>
            <div class="stats">
              <div class="mc-well stat"><i class="mc-icon i-sword"></i>
                <div class="mc-col"><span class="cf">%statistic_player_kills%</span><span class="c7 small">Player kills</span></div>
              </div>
              <div class="mc-well stat"><i class="mc-icon i-heart"></i>
                <div class="mc-col"><span class="cf">%statistic_deaths%</span><span class="c7 small">Deaths</span></div>
              </div>
              <div class="mc-well stat"><i class="mc-icon i-pickaxe"></i>
                <div class="mc-col"><span class="cf">%statistic_mine_block%</span><span class="c7 small">Blocks mined</span></div>
              </div>
              <div class="mc-well stat"><i class="mc-icon i-emerald"></i>
                <div class="mc-col"><span class="cf">%vault_eco_balance%</span><span class="c7 small">Emeralds</span></div>
              </div>
              <div class="mc-well stat"><i class="mc-icon i-clock"></i>
                <div class="mc-col"><span class="cf">%statistic_time_played%</span><span class="c7 small">Played</span></div>
              </div>
              <div class="mc-well stat"><i class="mc-icon i-map"></i>
                <div class="mc-col"><span class="cf">9 of 12</span><span class="c7 small">Warps found</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="badges-head"><span class="label">Achievements</span><span class="label small">7 of 15 unlocked</span></div>
        <div class="badges">
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-pickaxe"></i>
            <div class="mc-tooltip">
              <div class="ce">Getting an Upgrade</div>
              <div class="c7">Craft a better pickaxe</div>
              <div class="ca">Unlocked 2 Mar</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-bread"></i>
            <div class="mc-tooltip">
              <div class="ce">Fed and Ready</div>
              <div class="c7">Eat 100 loaves of bread</div>
              <div class="ca">Unlocked 4 Mar</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-sword"></i>
            <div class="mc-tooltip">
              <div class="ce">Monster Hunter</div>
              <div class="c7">Defeat 500 hostile mobs</div>
              <div class="ca">Unlocked 11 Mar</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-diamond"></i>
            <div class="mc-tooltip">
              <div class="ce">Diamonds!</div>
              <div class="c7">Find your first diamond</div>
              <div class="ca">Unlocked 12 Mar</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-compass"></i>
            <div class="mc-tooltip">
              <div class="ce">Wayfinder</div>
              <div class="c7">Visit every warp</div>
              <div class="ca">Unlocked 20 Mar</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-shield"></i>
            <div class="mc-tooltip">
              <div class="ce">Not Today</div>
              <div class="c7">Block 50 attacks with a shield</div>
              <div class="ca">Unlocked 2 Apr</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up"><i class="mc-icon lg i-chest"></i>
            <div class="mc-tooltip">
              <div class="ce">Hoarder</div>
              <div class="c7">Fill a double chest with one item</div>
              <div class="ca">Unlocked 9 Apr</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Local Brewery</div>
              <div class="c7">Brew 64 potions</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Bookworm</div>
              <div class="c7">Enchant at level 30</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Star Collector</div>
              <div class="c7">Defeat the Wither</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up tip-left locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Lucky Draw</div>
              <div class="c7">Open 25 crates</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up tip-left locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Survivor</div>
              <div class="c7">Play 100 hours without dying</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up tip-left locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Tycoon</div>
              <div class="c7">Hold 100,000 emeralds</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up tip-left locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Golden Touch</div>
              <div class="c7">Eat an Enchanted Apple</div>
              <div class="cc">Locked</div>
            </div>
          </div>
          <div class="mc-slot big tip tip-up tip-left locked"><span class="c8 big">?</span>
            <div class="mc-tooltip">
              <div class="cf">Cartographer</div>
              <div class="c7">Fill in a whole map</div>
              <div class="cc">Locked</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mc-hint c7 small">Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "shop.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="entity.villager.ambient">
    <title>Market</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .shop-panel {
        width: 864px;
      }
      .balance {
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 260px;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .shop-body {
        display: grid;
        grid-template-columns: 392px 1fr;
        gap: 12px;
      }
      .wares {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
      }
      .ware {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 6px 0 4px;
        border: 2px solid transparent;
        cursor: pointer;
      }
      .ware:hover {
        border-color: #8b8b8b;
      }
      .ware .mc-slot {
        pointer-events: none;
      }
      .ware.sold .mc-slot {
        background: #6b6b6b;
      }
      .detail {
        display: none;
        flex-direction: column;
        gap: 8px;
        height: 100%;
      }
      .detail-head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .detail-line {
        height: 2px;
        background: #555;
      }
      .detail-buy {
        display: flex;
        gap: 8px;
        margin-top: auto;
      }
      .detail-buy .mc-btn {
        flex: 1;
      }
      #w0:checked~.shop-panel .show-w0 {
        display: flex;
      }
      #w0:checked~.shop-panel label[for=w0] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w1:checked~.shop-panel .show-w1 {
        display: flex;
      }
      #w1:checked~.shop-panel label[for=w1] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w2:checked~.shop-panel .show-w2 {
        display: flex;
      }
      #w2:checked~.shop-panel label[for=w2] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w3:checked~.shop-panel .show-w3 {
        display: flex;
      }
      #w3:checked~.shop-panel label[for=w3] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w4:checked~.shop-panel .show-w4 {
        display: flex;
      }
      #w4:checked~.shop-panel label[for=w4] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w5:checked~.shop-panel .show-w5 {
        display: flex;
      }
      #w5:checked~.shop-panel label[for=w5] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w6:checked~.shop-panel .show-w6 {
        display: flex;
      }
      #w6:checked~.shop-panel label[for=w6] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w7:checked~.shop-panel .show-w7 {
        display: flex;
      }
      #w7:checked~.shop-panel label[for=w7] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w8:checked~.shop-panel .show-w8 {
        display: flex;
      }
      #w8:checked~.shop-panel label[for=w8] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w9:checked~.shop-panel .show-w9 {
        display: flex;
      }
      #w9:checked~.shop-panel label[for=w9] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w10:checked~.shop-panel .show-w10 {
        display: flex;
      }
      #w10:checked~.shop-panel label[for=w10] {
        background: #4a4a4a;
        border-color: #fff;
      }
      #w11:checked~.shop-panel .show-w11 {
        display: flex;
      }
      #w11:checked~.shop-panel label[for=w11] {
        background: #4a4a4a;
        border-color: #fff;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <input type="radio" class="pick" name="ware" id="w0" checked>
      <input type="radio" class="pick" name="ware" id="w1">
      <input type="radio" class="pick" name="ware" id="w2">
      <input type="radio" class="pick" name="ware" id="w3">
      <input type="radio" class="pick" name="ware" id="w4">
      <input type="radio" class="pick" name="ware" id="w5">
      <input type="radio" class="pick" name="ware" id="w6">
      <input type="radio" class="pick" name="ware" id="w7">
      <input type="radio" class="pick" name="ware" id="w8">
      <input type="radio" class="pick" name="ware" id="w9">
      <input type="radio" class="pick" name="ware" id="w10">
      <input type="radio" class="pick" name="ware" id="w11">
      <div class="mc-title big cf">Market</div>
      <div class="mc-panel shop-panel">
        <div class="mc-spread">
          <span class="label">Trade your emeralds for supplies</span>
          <span class="balance"><span class="label">Balance</span><span class="mc-well balance"><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">%vault_eco_balance%</span></span></span></span>
        </div>
        <div class="shop-body">
          <div class="mc-well wares">
            <label for="w0" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-pickaxe"></i></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">48</span></span>
            </label>
            <label for="w1" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-sword"></i></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">16</span></span>
            </label>
            <label for="w2" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-shield"></i></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">12</span></span>
            </label>
            <label for="w3" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-bread"></i><span class="n">16</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">16</span></span>
            </label>
            <label for="w4" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-apple"></i><span class="n">16</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">32</span></span>
            </label>
            <label for="w5" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-potion-red"></i><span class="n">4</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">24</span></span>
            </label>
            <label for="w6" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-potion-green"></i><span class="n">4</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">24</span></span>
            </label>
            <label for="w7" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-potion-gold"></i><span class="n">4</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">32</span></span>
            </label>
            <label for="w8" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-map"></i></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">20</span></span>
            </label>
            <label for="w9" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-compass"></i></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">4</span></span>
            </label>
            <label for="w10" class="ware sold">
              <div class="mc-slot big"><i class="mc-icon lg i-book"></i></div>
              <span class="c8 small">Sold out</span>
            </label>
            <label for="w11" class="ware">
              <div class="mc-slot big"><i class="mc-icon lg i-key"></i><span class="n">4</span></div>
              <span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">120</span></span>
            </label>
          </div>
          <div class="mc-well">
            <div class="detail show-w0">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-pickaxe"></i></div>
                <div class="mc-col">
                  <span class="cb">Diamond Pickaxe</span>
                  <span class="c7 small">Tool</span>
                </div>
              </div>
              <p class="c7">Mines anything but bedrock. Comes with Efficiency III.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">48 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">6 left</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy diamond_pickaxe 1" data-sound="entity.villager.yes">Buy <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">48</span></span></button>
              </div>
            </div>
            <div class="detail show-w1">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-sword"></i></div>
                <div class="mc-col">
                  <span class="cf">Iron Sword</span>
                  <span class="c7 small">Weapon</span>
                </div>
              </div>
              <p class="c7">A dependable blade with Sharpness I.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">16 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy iron_sword 1" data-sound="entity.villager.yes">Buy <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">16</span></span></button>
              </div>
            </div>
            <div class="detail show-w2">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-shield"></i></div>
                <div class="mc-col">
                  <span class="cf">Shield</span>
                  <span class="c7 small">Armour</span>
                </div>
              </div>
              <p class="c7">Stops arrows, axes and creeper blasts from the front.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">12 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy shield 1" data-sound="entity.villager.yes">Buy <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">12</span></span></button>
              </div>
            </div>
            <div class="detail show-w3">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-bread"></i></div>
                <div class="mc-col">
                  <span class="cf">Bread</span>
                  <span class="c7 small">Food</span>
                </div>
              </div>
              <p class="c7">Fresh from the spawn bakery. Five hunger points a loaf.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">1 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy bread 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">1</span></span></button>
                <button class="mc-btn" data-command="shop buy bread 16" data-sound="entity.villager.yes">Buy 16 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">16</span></span></button>
              </div>
            </div>
            <div class="detail show-w4">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-apple"></i></div>
                <div class="mc-col">
                  <span class="cf">Apple</span>
                  <span class="c7 small">Food</span>
                </div>
              </div>
              <p class="c7">Crisp, red and picked this morning.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">2 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy apple 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">2</span></span></button>
                <button class="mc-btn" data-command="shop buy apple 16" data-sound="entity.villager.yes">Buy 16 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">32</span></span></button>
              </div>
            </div>
            <div class="detail show-w5">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-potion-red"></i></div>
                <div class="mc-col">
                  <span class="ce">Potion of Healing</span>
                  <span class="c7 small">Potion</span>
                </div>
              </div>
              <p class="c7">Instant Health II. Drink it before the second hit.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">6 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">24 left</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy healing 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">6</span></span></button>
                <button class="mc-btn" data-command="shop buy healing 4" data-sound="entity.villager.yes">Buy 4 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">24</span></span></button>
              </div>
            </div>
            <div class="detail show-w6">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-potion-green"></i></div>
                <div class="mc-col">
                  <span class="ce">Potion of Swiftness</span>
                  <span class="c7 small">Potion</span>
                </div>
              </div>
              <p class="c7">Speed II for a minute and a half.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">6 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">24 left</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy swiftness 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">6</span></span></button>
                <button class="mc-btn" data-command="shop buy swiftness 4" data-sound="entity.villager.yes">Buy 4 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">24</span></span></button>
              </div>
            </div>
            <div class="detail show-w7">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-potion-gold"></i></div>
                <div class="mc-col">
                  <span class="ce">Fire Resistance</span>
                  <span class="c7 small">Potion</span>
                </div>
              </div>
              <p class="c7">Eight minutes of walking through lava.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">8 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">12 left</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy fire_resistance 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">8</span></span></button>
                <button class="mc-btn" data-command="shop buy fire_resistance 4" data-sound="entity.villager.yes">Buy 4 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">32</span></span></button>
              </div>
            </div>
            <div class="detail show-w8">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-map"></i></div>
                <div class="mc-col">
                  <span class="cb">Explorer Map</span>
                  <span class="c7 small">Map</span>
                </div>
              </div>
              <p class="c7">Leads to the nearest woodland mansion.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">20 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">3 left</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy explorer_map 1" data-sound="entity.villager.yes">Buy <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">20</span></span></button>
              </div>
            </div>
            <div class="detail show-w9">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-compass"></i></div>
                <div class="mc-col">
                  <span class="cf">Compass</span>
                  <span class="c7 small">Tool</span>
                </div>
              </div>
              <p class="c7">Always points back to spawn.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">4 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy compass 1" data-sound="entity.villager.yes">Buy <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">4</span></span></button>
              </div>
            </div>
            <div class="detail show-w10">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-book"></i></div>
                <div class="mc-col">
                  <span class="cd">Enchanted Book</span>
                  <span class="c7 small">Mending</span>
                </div>
              </div>
              <p class="c7">Mending. Repairs your gear with experience.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">64 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cc">Sold out</span></div>
              <div class="detail-buy">
                <button class="mc-btn off" disabled>Restocks in 2h 14m</button>
              </div>
            </div>
            <div class="detail show-w11">
              <div class="detail-head">
                <div class="mc-slot big"><i class="mc-icon lg i-key"></i></div>
                <div class="mc-col">
                  <span class="ce">Vote Crate Key</span>
                  <span class="c7 small">Key</span>
                </div>
              </div>
              <p class="c7">Opens one Vote Crate in the crates screen.</p>
              <div class="detail-line"></div>
              <div class="mc-spread"><span class="c7">Price</span><span class="price"><i class="mc-icon i-emerald sm"></i><span class="ca">30 each</span></span></div>
              <div class="mc-spread"><span class="c7">Stock</span><span class="cf">In stock</span></div>
              <div class="detail-buy">
                <button class="mc-btn" data-command="shop buy vote_key 1" data-sound="entity.villager.yes">Buy 1 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">30</span></span></button>
                <button class="mc-btn" data-command="shop buy vote_key 4" data-sound="entity.villager.yes">Buy 4 <span class="price"><i class="mc-icon i-emerald sm"></i><span class="cf">120</span></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mc-row">
        <a class="mc-btn half" href="crates.html">Crates</a>
        <button class="mc-btn half" data-action="close" data-key="q">Done</button>
      </div>
    </div>
  </body>
</html>
`,
  "crates.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="block.chest.open">
    <title>Crates</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .crates-panel {
        width: 820px;
      }
      .crates-body {
        display: grid;
        grid-template-columns: 288px 1fr;
        gap: 12px;
      }
      .crate-list .mc-choice {
        margin-bottom: 0;
      }
      .crate-list .keys {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .crate {
        display: none;
        flex-direction: column;
        gap: 12px;
      }
      .crate-head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .loot {
        display: flex;
      }
      .loot .mc-slot {
        cursor: default;
      }
      .loot .r-ce {
        box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff, inset 0 0 0 4px #ffff55;
      }
      .loot .r-cb {
        box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff, inset 0 0 0 4px #55ffff;
      }
      .loot .r-cd {
        box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff, inset 0 0 0 4px #ff55ff;
      }
      .loot .r-c6 {
        box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff, inset 0 0 0 4px #ffaa00;
      }
      .tip-left>.mc-tooltip {
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: 8px;
      }
      .open-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .open-row .who {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .how {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      #k-vote:checked~.crates-panel .show-vote {
        display: flex;
      }
      #k-vote:checked~.crates-panel label[for=k-vote] {
        background: #373737;
        border-color: #fff;
      }
      #k-rare:checked~.crates-panel .show-rare {
        display: flex;
      }
      #k-rare:checked~.crates-panel label[for=k-rare] {
        background: #373737;
        border-color: #fff;
      }
      #k-legendary:checked~.crates-panel .show-legendary {
        display: flex;
      }
      #k-legendary:checked~.crates-panel label[for=k-legendary] {
        background: #373737;
        border-color: #fff;
      }
      .detail-line {
        height: 2px;
        background: #555;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <input type="radio" class="pick" name="crate" id="k-vote" checked>
      <input type="radio" class="pick" name="crate" id="k-rare">
      <input type="radio" class="pick" name="crate" id="k-legendary">
      <div class="mc-title big cf">Crates</div>
      <div class="mc-panel crates-panel">
        <span class="label">Pick a crate to see what's inside</span>
        <div class="crates-body">
          <div class="mc-col crate-list">
            <label for="k-vote" class="mc-choice"><i class="mc-icon i-chest"></i><span class="ca">Vote Crate</span><span class="c7 small keys"><i class="mc-icon sm i-key"></i>3</span></label>
            <label for="k-rare" class="mc-choice"><i class="mc-icon i-chest"></i><span class="cb">Rare Crate</span><span class="c7 small keys"><i class="mc-icon sm i-key"></i>1</span></label>
            <label for="k-legendary" class="mc-choice"><i class="mc-icon i-chest"></i><span class="c6">Legendary Crate</span><span class="c7 small keys"><i class="mc-icon sm i-key"></i>0</span></label>
            <div class="mc-well light mc-grow how">
              <span class="label small">Vote with /vote for keys.</span>
              <span class="label small">Rarer keys drop at events.</span>
            </div>
          </div>
          <div class="mc-well">
            <div class="crate show-vote">
              <div class="crate-head">
                <div class="mc-slot big"><i class="mc-icon lg i-chest"></i></div>
                <div class="mc-col">
                  <span class="ca">Vote Crate</span>
                  <span class="c7 small">One key for every vote • 1 key per open</span>
                </div>
              </div>
              <span class="c7 small">Possible rewards (hover for the odds)</span>
              <div class="loot">
                <div class="mc-slot big tip"><i class="mc-icon lg i-bread"></i><span class="n">16</span>
                  <div class="mc-tooltip">
                    <div class="cf">Bread</div>
                    <div class="c7">25% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip"><i class="mc-icon lg i-apple"></i><span class="n">8</span>
                  <div class="mc-tooltip">
                    <div class="cf">Apple</div>
                    <div class="c7">20% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip"><i class="mc-icon lg i-emerald"></i><span class="n">8</span>
                  <div class="mc-tooltip">
                    <div class="cf">Emeralds</div>
                    <div class="c7">18% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip"><i class="mc-icon lg i-gold"></i><span class="n">4</span>
                  <div class="mc-tooltip">
                    <div class="cf">Gold Coins</div>
                    <div class="c7">12% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-ce"><i class="mc-icon lg i-potion-green"></i>
                  <div class="mc-tooltip">
                    <div class="ce">Potion of Swiftness</div>
                    <div class="c7">10% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left"><i class="mc-icon lg i-compass"></i>
                  <div class="mc-tooltip">
                    <div class="cf">Compass</div>
                    <div class="c7">8% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cb"><i class="mc-icon lg i-diamond"></i><span class="n">2</span>
                  <div class="mc-tooltip">
                    <div class="cb">Diamonds</div>
                    <div class="c7">5% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cd"><i class="mc-icon lg i-key"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Rare Crate Key</div>
                    <div class="c7">2% chance</div>
                  </div>
                </div>
              </div>
              <div class="detail-line"></div>
              <div class="open-row">
                <div class="who"><i class="mc-icon sm i-key"></i><span class="cf">3 keys</span></div>
                <button class="mc-btn" data-command="crate open vote" data-close data-sound="block.chest.open">Open crate</button>
                <button class="mc-btn" data-command="crate open vote 3" data-close data-sound="block.chest.open">Open all 3</button>
              </div>
            </div>
            <div class="crate show-rare">
              <div class="crate-head">
                <div class="mc-slot big"><i class="mc-icon lg i-chest"></i></div>
                <div class="mc-col">
                  <span class="cb">Rare Crate</span>
                  <span class="c7 small">From events and the market • 1 key per open</span>
                </div>
              </div>
              <span class="c7 small">Possible rewards (hover for the odds)</span>
              <div class="loot">
                <div class="mc-slot big tip r-cb"><i class="mc-icon lg i-diamond"></i><span class="n">4</span>
                  <div class="mc-tooltip">
                    <div class="cb">Diamonds</div>
                    <div class="c7">22% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-ce"><i class="mc-icon lg i-emerald"></i><span class="n">32</span>
                  <div class="mc-tooltip">
                    <div class="ce">Emeralds</div>
                    <div class="c7">20% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-ce"><i class="mc-icon lg i-potion-red"></i><span class="n">3</span>
                  <div class="mc-tooltip">
                    <div class="ce">Potion of Healing</div>
                    <div class="c7">16% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-ce"><i class="mc-icon lg i-potion-gold"></i><span class="n">2</span>
                  <div class="mc-tooltip">
                    <div class="ce">Fire Resistance</div>
                    <div class="c7">14% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-cb"><i class="mc-icon lg i-map"></i>
                  <div class="mc-tooltip">
                    <div class="cb">Explorer Map</div>
                    <div class="c7">10% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left"><i class="mc-icon lg i-shield"></i>
                  <div class="mc-tooltip">
                    <div class="cf">Shield</div>
                    <div class="c7">9% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cb"><i class="mc-icon lg i-pickaxe"></i>
                  <div class="mc-tooltip">
                    <div class="cb">Diamond Pickaxe</div>
                    <div class="c7">6% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cd"><i class="mc-icon lg i-book"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Enchanted Book</div>
                    <div class="c7">3% chance</div>
                  </div>
                </div>
              </div>
              <div class="detail-line"></div>
              <div class="open-row">
                <div class="who"><i class="mc-icon sm i-key"></i><span class="cf">1 key</span></div>
                <button class="mc-btn" data-command="crate open rare" data-close data-sound="block.chest.open">Open crate</button>
              </div>
            </div>
            <div class="crate show-legendary">
              <div class="crate-head">
                <div class="mc-slot big"><i class="mc-icon lg i-chest"></i></div>
                <div class="mc-col">
                  <span class="c6">Legendary Crate</span>
                  <span class="c7 small">Top voter each week • 1 key per open</span>
                </div>
              </div>
              <span class="c7 small">Possible rewards (hover for the odds)</span>
              <div class="loot">
                <div class="mc-slot big tip r-cb"><i class="mc-icon lg i-diamond"></i><span class="n">16</span>
                  <div class="mc-tooltip">
                    <div class="cb">Diamonds</div>
                    <div class="c7">24% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-ce"><i class="mc-icon lg i-emerald"></i><span class="n">64</span>
                  <div class="mc-tooltip">
                    <div class="ce">Emeralds</div>
                    <div class="c7">22% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-cd"><i class="mc-icon lg i-book"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Book of Mending</div>
                    <div class="c7">15% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-cd"><i class="mc-icon lg i-sword"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Dawnbreaker</div>
                    <div class="c7">12% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip r-cd"><i class="mc-icon lg i-apple"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Enchanted Apple</div>
                    <div class="c7">10% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cd"><i class="mc-icon lg i-heart"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Extra Heart</div>
                    <div class="c7">8% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-c6"><i class="mc-icon lg i-key"></i>
                  <div class="mc-tooltip">
                    <div class="c6">Legendary Key</div>
                    <div class="c7">6% chance</div>
                  </div>
                </div>
                <div class="mc-slot big tip tip-left r-cd"><i class="mc-icon lg i-diamond"></i>
                  <div class="mc-tooltip">
                    <div class="cd">Diamond Hoard</div>
                    <div class="c7">3% chance</div>
                  </div>
                </div>
              </div>
              <div class="detail-line"></div>
              <div class="open-row">
                <div class="who"><i class="mc-icon sm i-key"></i><span class="cc">0 keys</span></div>
                <button class="mc-btn off" disabled>No keys</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mc-row">
        <a class="mc-btn half" href="shop.html">Back to Market</a>
        <button class="mc-btn half" data-action="close" data-key="q">Done</button>
      </div>
    </div>
  </body>
</html>
`,
  "servers.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:refresh" content="5">
    <title>Choose a Mode</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .modes-panel {
        width: 760px;
      }
      .modes {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }
      .mode {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .mode-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .mode-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mode-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
      }
      .mode .mc-btn {
        width: 100%;
        margin-top: auto;
      }
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 4px;
        background: #55ff55;
      }
      .dot.busy {
        background: #ffaa00;
      }
    </style>
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title cf big">Choose a Mode</div>
      <div class="mc-panel modes-panel">
        <div class="label">Pick where to play. Your inventory stays with each mode.</div>
        <div class="modes">
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-pickaxe"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Survival</span><span class="mc-key">1</span></div>
                <span class="ca small"><i class="dot"></i>214 playing</span>
                <span class="c7 small">Claims and shops</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server survival" data-close data-key="1">Join</button>
          </div>
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-compass"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Skyblock</span><span class="mc-key">2</span></div>
                <span class="ca small"><i class="dot"></i>168 playing</span>
                <span class="c7 small">Grow an island</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server skyblock" data-close data-key="2">Join</button>
          </div>
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-sword"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Factions</span><span class="mc-key">3</span></div>
                <span class="c6 small"><i class="dot busy"></i>Season ends Sun</span>
                <span class="c7 small">Raid and defend</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server factions" data-close data-key="3">Join</button>
          </div>
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-diamond"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Creative</span><span class="mc-key">4</span></div>
                <span class="ca small"><i class="dot"></i>57 playing</span>
                <span class="c7 small">Plots and WorldEdit</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server creative" data-close data-key="4">Join</button>
          </div>
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-key"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Prison</span><span class="mc-key">5</span></div>
                <span class="ca small"><i class="dot"></i>92 playing</span>
                <span class="c7 small">Mine and rank up</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server prison" data-close data-key="5">Join</button>
          </div>
          <div class="mc-well mode">
            <div class="mode-head">
              <div class="mc-slot big"><i class="mc-icon i-clock"></i></div>
              <div class="mode-text">
                <div class="mode-name"><span class="cf">Minigames</span><span class="mc-key">6</span></div>
                <span class="ca small"><i class="dot"></i>131 playing</span>
                <span class="c7 small">Bed Wars, parkour</span>
              </div>
            </div>
            <button class="mc-btn small" data-command="server minigames" data-close data-key="6">Join</button>
          </div>
        </div>
      </div>
      <div class="mc-hint c7 small">Press 1–6 to join • Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "leaderboard.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="ui.toast.challenge_complete">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .board-panel {
        width: 784px;
      }
      .tabs {
        display: flex;
        gap: 8px;
      }
      .tab {
        cursor: pointer;
      }
      .board {
        display: none;
        grid-template-columns: 364px 1fr;
        gap: 12px;
      }
      .podium {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 6px;
        padding: 8px 8px 0;
      }
      .place {
        width: 108px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .place img {
        width: 40px;
        height: 40px;
        image-rendering: pixelated;
      }
      .place.first img {
        width: 48px;
        height: 48px;
      }
      .place .who {
        max-width: 108px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .step {
        width: 100%;
        display: grid;
        place-items: center;
        border: 2px solid #000;
        margin-top: 4px;
      }
      .step.gold {
        height: 76px;
        background: #e6b324;
        box-shadow: inset 4px 4px 0 #fff0a8, inset -4px -4px 0 #a37a0f;
      }
      .step.silver {
        height: 56px;
        background: #b4b9c2;
        box-shadow: inset 4px 4px 0 #eef1f6, inset -4px -4px 0 #6f7480;
      }
      .step.bronze {
        height: 40px;
        background: #b8733a;
        box-shadow: inset 4px 4px 0 #e2a873, inset -4px -4px 0 #6e3f1a;
      }
      .ranks {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .rank-row {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 26px;
        padding: 0 6px;
      }
      .rank-row:nth-child(odd) {
        background: #2c2c2c;
      }
      .rank-row img {
        width: 16px;
        height: 16px;
        image-rendering: pixelated;
      }
      .rank-row .n {
        width: 32px;
      }
      .rank-row .who {
        flex: 1;
      }
      .you {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .you img {
        width: 32px;
        height: 32px;
        image-rendering: pixelated;
      }
      .you .who {
        flex: 1;
      }
      #b-kills:checked~.board-panel .show-kills {
        display: grid;
      }
      #b-kills:checked~.board-panel label[for=b-kills] {
        color: #ff5;
        text-shadow: 2px 2px 0 #3f3f15;
        background: #4c4c4c;
        box-shadow: inset 2px 2px 0 #7a7a7a, inset -2px -4px 0 #3a3a3a;
      }
      #b-mined:checked~.board-panel .show-mined {
        display: grid;
      }
      #b-mined:checked~.board-panel label[for=b-mined] {
        color: #ff5;
        text-shadow: 2px 2px 0 #3f3f15;
        background: #4c4c4c;
        box-shadow: inset 2px 2px 0 #7a7a7a, inset -2px -4px 0 #3a3a3a;
      }
      #b-time:checked~.board-panel .show-time {
        display: grid;
      }
      #b-time:checked~.board-panel label[for=b-time] {
        color: #ff5;
        text-shadow: 2px 2px 0 #3f3f15;
        background: #4c4c4c;
        box-shadow: inset 2px 2px 0 #7a7a7a, inset -2px -4px 0 #3a3a3a;
      }
      .your-kills {
        display: none;
      }
      #b-kills:checked~.board-panel .your-kills {
        display: inline;
      }
      .your-mined {
        display: none;
      }
      #b-mined:checked~.board-panel .your-mined {
        display: inline;
      }
      .your-time {
        display: none;
      }
      #b-time:checked~.board-panel .your-time {
        display: inline;
      }

    </style>
  </head>
  <body>
    <div class="mc-screen">
      <input type="radio" class="pick" name="board" id="b-kills" checked>
      <input type="radio" class="pick" name="board" id="b-mined">
      <input type="radio" class="pick" name="board" id="b-time">
      <div class="mc-title big cf">Leaderboard</div>
      <div class="mc-panel board-panel">
        <div class="mc-spread">
          <div class="tabs">
            <label for="b-kills" class="mc-btn small tab"><i class="mc-icon sm i-sword"></i>Player kills</label>
            <label for="b-mined" class="mc-btn small tab"><i class="mc-icon sm i-pickaxe"></i>Blocks mined</label>
            <label for="b-time" class="mc-btn small tab"><i class="mc-icon sm i-clock"></i>Playtime</label>
          </div>
          <span class="label small">Season 4 • ends in 12 days</span>
        </div>
        <div class="board show-kills">
          <div class="mc-well podium">
            <div class="place">

              <img src="head:Mossbeard" alt="Mossbeard">
              <span class="cf who">Mossbeard</span>
              <span class="c7 small">1,102</span>
              <div class="step silver"><span class="cf big">2</span></div>
            </div>
            <div class="place first">
              <i class="mc-icon sm i-gold"></i>
              <img src="head:NovaRay" alt="NovaRay">
              <span class="cf who">NovaRay</span>
              <span class="c6 small">1,284</span>
              <div class="step gold"><span class="cf big">1</span></div>
            </div>
            <div class="place">

              <img src="head:LunaFox" alt="LunaFox">
              <span class="cf who">LunaFox</span>
              <span class="c7 small">987</span>
              <div class="step bronze"><span class="cf big">3</span></div>
            </div>
          </div>
          <div class="mc-well ranks">
            <div class="rank-row"><span class="c7 n">#4</span><img src="head:Brickwell" alt=""><span class="cf who">Brickwell</span><span class="ca">812</span></div>
            <div class="rank-row"><span class="c7 n">#5</span><img src="head:Tumbleweed" alt=""><span class="cf who">Tumbleweed</span><span class="ca">790</span></div>
            <div class="rank-row"><span class="c7 n">#6</span><img src="head:Pixelmancer" alt=""><span class="cf who">Pixelmancer</span><span class="ca">655</span></div>
            <div class="rank-row"><span class="c7 n">#7</span><img src="head:Oakleaf" alt=""><span class="cf who">Oakleaf</span><span class="ca">601</span></div>
            <div class="rank-row"><span class="c7 n">#8</span><img src="head:Quartzite" alt=""><span class="cf who">Quartzite</span><span class="ca">544</span></div>
            <div class="rank-row"><span class="c7 n">#9</span><img src="head:Embergale" alt=""><span class="cf who">Embergale</span><span class="ca">512</span></div>
            <div class="rank-row"><span class="c7 n">#10</span><img src="head:Kiwi" alt=""><span class="cf who">Kiwi</span><span class="ca">498</span></div>
          </div>
        </div>
        <div class="board show-mined">
          <div class="mc-well podium">
            <div class="place">

              <img src="head:Mossbeard" alt="Mossbeard">
              <span class="cf who">Mossbeard</span>
              <span class="c7 small">251,880</span>
              <div class="step silver"><span class="cf big">2</span></div>
            </div>
            <div class="place first">
              <i class="mc-icon sm i-gold"></i>
              <img src="head:Quartzite" alt="Quartzite">
              <span class="cf who">Quartzite</span>
              <span class="c6 small">284,113</span>
              <div class="step gold"><span class="cf big">1</span></div>
            </div>
            <div class="place">

              <img src="head:Brickwell" alt="Brickwell">
              <span class="cf who">Brickwell</span>
              <span class="c7 small">198,442</span>
              <div class="step bronze"><span class="cf big">3</span></div>
            </div>
          </div>
          <div class="mc-well ranks">
            <div class="rank-row"><span class="c7 n">#4</span><img src="head:Oakleaf" alt=""><span class="cf who">Oakleaf</span><span class="ca">176,005</span></div>
            <div class="rank-row"><span class="c7 n">#5</span><img src="head:Kiwi" alt=""><span class="cf who">Kiwi</span><span class="ca">150,290</span></div>
            <div class="rank-row"><span class="c7 n">#6</span><img src="head:NovaRay" alt=""><span class="cf who">NovaRay</span><span class="ca">133,718</span></div>
            <div class="rank-row"><span class="c7 n">#7</span><img src="head:Embergale" alt=""><span class="cf who">Embergale</span><span class="ca">120,064</span></div>
            <div class="rank-row"><span class="c7 n">#8</span><img src="head:LunaFox" alt=""><span class="cf who">LunaFox</span><span class="ca">98,321</span></div>
            <div class="rank-row"><span class="c7 n">#9</span><img src="head:Tumbleweed" alt=""><span class="cf who">Tumbleweed</span><span class="ca">91,447</span></div>
            <div class="rank-row"><span class="c7 n">#10</span><img src="head:Pixelmancer" alt=""><span class="cf who">Pixelmancer</span><span class="ca">88,912</span></div>
          </div>
        </div>
        <div class="board show-time">
          <div class="mc-well podium">
            <div class="place">

              <img src="head:LunaFox" alt="LunaFox">
              <span class="cf who">LunaFox</span>
              <span class="c7 small">1,113h</span>
              <div class="step silver"><span class="cf big">2</span></div>
            </div>
            <div class="place first">
              <i class="mc-icon sm i-gold"></i>
              <img src="head:Tumbleweed" alt="Tumbleweed">
              <span class="cf who">Tumbleweed</span>
              <span class="c6 small">1,204h</span>
              <div class="step gold"><span class="cf big">1</span></div>
            </div>
            <div class="place">

              <img src="head:Kiwi" alt="Kiwi">
              <span class="cf who">Kiwi</span>
              <span class="c7 small">987h</span>
              <div class="step bronze"><span class="cf big">3</span></div>
            </div>
          </div>
          <div class="mc-well ranks">
            <div class="rank-row"><span class="c7 n">#4</span><img src="head:Pixelmancer" alt=""><span class="cf who">Pixelmancer</span><span class="ca">940h</span></div>
            <div class="rank-row"><span class="c7 n">#5</span><img src="head:Mossbeard" alt=""><span class="cf who">Mossbeard</span><span class="ca">902h</span></div>
            <div class="rank-row"><span class="c7 n">#6</span><img src="head:Embergale" alt=""><span class="cf who">Embergale</span><span class="ca">811h</span></div>
            <div class="rank-row"><span class="c7 n">#7</span><img src="head:Quartzite" alt=""><span class="cf who">Quartzite</span><span class="ca">765h</span></div>
            <div class="rank-row"><span class="c7 n">#8</span><img src="head:NovaRay" alt=""><span class="cf who">NovaRay</span><span class="ca">741h</span></div>
            <div class="rank-row"><span class="c7 n">#9</span><img src="head:Oakleaf" alt=""><span class="cf who">Oakleaf</span><span class="ca">690h</span></div>
            <div class="rank-row"><span class="c7 n">#10</span><img src="head:Brickwell" alt=""><span class="cf who">Brickwell</span><span class="ca">655h</span></div>
          </div>
        </div>
        <div class="mc-well you">
          <img src="head:{player}" alt="">
          <div class="mc-col who">
            <span class="cf">{player}</span>
            <span class="c7 small">Your place this season</span>
          </div>
          <span class="ce big your your-kills">#42</span><span class="ce big your your-mined">#118</span><span class="ce big your your-time">#67</span>
        </div>
      </div>
      <div class="mc-hint c7 small">Sneak to leave</div>
    </div>
  </body>
</html>
`,
  "rules.html": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <meta name="ui:open-sound" content="item.book.page_turn">
    <title>Server Rules</title>
    <link rel="stylesheet" href="minecraft.css">
    <style>
      html,
      body {
        background: transparent;
      }
      .rules-panel {
        width: 620px;
      }
      .rule {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 8px;
      }
      .rule + .rule {
        border-top: 2px solid #2b2b2b;
      }
      .rule-number {
        width: 28px;
        flex-shrink: 0;
        text-align: center;
      }
      .rule-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .rules-list {
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title cf big">Server Rules</div>
      <div class="mc-panel rules-panel">
        <div class="label">Play fair and everyone has a better time. Breaking a rule can mean a mute, a kick or a ban.</div>
        <div class="mc-well rules-list">
          <div class="rule">
            <span class="rule-number c6">1</span>
            <div class="rule-text">
              <span class="cf">Be kind in chat</span>
              <span class="c7 small">No insults, slurs or harassment, in any language.</span>
            </div>
          </div>
          <div class="rule">
            <span class="rule-number c6">2</span>
            <div class="rule-text">
              <span class="cf">No cheats or hacked clients</span>
              <span class="c7 small">X-ray, fly, kill aura and auto-clickers are all bannable.</span>
            </div>
          </div>
          <div class="rule">
            <span class="rule-number c6">3</span>
            <div class="rule-text">
              <span class="cf">Don't grief or steal</span>
              <span class="c7 small">Leave other players' builds and chests alone, claimed or not.</span>
            </div>
          </div>
          <div class="rule">
            <span class="rule-number c6">4</span>
            <div class="rule-text">
              <span class="cf">No spam or advertising</span>
              <span class="c7 small">Repeated messages and other servers' names are muted.</span>
            </div>
          </div>
          <div class="rule">
            <span class="rule-number c6">5</span>
            <div class="rule-text">
              <span class="cf">Keep builds friendly</span>
              <span class="c7 small">Nothing offensive. Lag machines are removed on sight.</span>
            </div>
          </div>
          <div class="rule">
            <span class="rule-number c6">6</span>
            <div class="rule-text">
              <span class="cf">Listen to staff</span>
              <span class="c7 small">Disagree in /helpop or on Discord, not in public chat.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mc-row">
        <button class="mc-btn half" data-command="rules accept" data-close data-sound="entity.player.levelup 0.6 1.2">I agree</button>
        <button class="mc-btn half" data-action="close" data-key="q">Done <span class="mc-key">Q</span></button>
      </div>
      <div class="mc-hint c7 small">Sneak to leave</div>
    </div>
  </body>
</html>
`,
};
