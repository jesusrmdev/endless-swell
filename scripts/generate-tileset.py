#!/usr/bin/env python3
"""
Generate placeholder tileset for Endless Swell.
Each tile is 16x16 pixels. Grid layout.
"""

from PIL import Image, ImageDraw

TILE_SIZE = 16
COLS = 8
ROWS = 8
WIDTH = COLS * TILE_SIZE
HEIGHT = ROWS * TILE_SIZE

# Tile definitions: (row, col, color, label)
# Colors chosen for Pokémon GBC aesthetic with limited palette
TILES = [
    # Row 0: Basic terrain
    (0, 0, (0, 0, 0, 0), "Empty"),           # Transparent
    (0, 1, (88, 160, 56), "Grass"),           # Green grass
    (0, 2, (136, 112, 72), "Path"),           # Sandy path
    (0, 3, (64, 64, 64), "Wall"),             # Gray wall (collision)
    (0, 4, (56, 104, 168), "Water"),          # Blue water
    (0, 5, (216, 200, 144), "Sand"),          # Light sand
    (0, 6, (96, 80, 56), "Rock"),             # Dark rock
    (0, 7, (72, 52, 32), "Trunk"),            # Tree trunk

    # Row 1: More terrain
    (1, 0, (48, 120, 40), "GrassDark"),       # Darker grass
    (1, 1, (104, 160, 72), "GrassLight"),     # Light grass
    (1, 2, (152, 128, 88), "PathLight"),      # Light path
    (1, 3, (120, 96, 64), "PathDark"),        # Dark path
    (1, 4, (72, 120, 184), "WaterLight"),     # Light water
    (1, 5, (232, 216, 160), "SandLight"),     # Lighter sand
    (1, 6, (112, 96, 72), "RockLight"),       # Light rock
    (1, 7, (40, 100, 32), "Leaves"),          # Tree leaves

    # Row 2: Buildings and objects
    (2, 0, (168, 104, 72), "BuildingWall"),   # Building wall
    (2, 1, (136, 80, 48), "BuildingDark"),    # Building dark
    (2, 2, (88, 64, 40), "Door"),             # Door
    (2, 3, (216, 192, 64), "Sign"),           # Sign/post
    (2, 4, (80, 80, 80), "Parking"),          # Parking surface
    (2, 5, (104, 104, 104), "ParkingLine"),   # Parking line
    (2, 6, (64, 120, 160), "Pool"),           # Pool water
    (2, 7, (184, 168, 128), "SandDark"),      # Dark sand

    # Row 3: Variations
    (3, 0, (72, 144, 48), "GrassV2"),         # Grass variation 2
    (3, 1, (96, 152, 64), "GrassV3"),         # Grass variation 3
    (3, 2, (144, 120, 80), "PathV2"),         # Path variation 2
    (3, 3, (48, 48, 48), "WallDark"),         # Dark wall
    (3, 4, (40, 88, 144), "WaterDark"),       # Dark water
    (3, 5, (200, 184, 128), "SandV2"),        # Sand variation 2
    (3, 6, (80, 64, 48), "RockDark"),         # Dark rock
    (3, 7, (56, 112, 40), "LeavesDark"),      # Dark leaves

    # Row 4-7: Fill with terrain variations for map building
    (4, 0, (80, 152, 56), "GrassV4"),
    (4, 1, (96, 168, 64), "GrassV5"),
    (4, 2, (128, 104, 72), "PathV3"),
    (4, 3, (72, 72, 72), "WallV2"),
    (4, 4, (48, 96, 152), "WaterV2"),
    (4, 5, (224, 208, 152), "SandV3"),
    (4, 6, (88, 72, 56), "RockV2"),
    (4, 7, (64, 128, 48), "LeavesV2"),

    (5, 0, (76, 148, 52), "GrassV6"),
    (5, 1, (92, 160, 60), "GrassV7"),
    (5, 2, (140, 116, 76), "PathV4"),
    (5, 3, (56, 56, 56), "WallV3"),
    (5, 4, (44, 92, 148), "WaterV3"),
    (5, 5, (220, 204, 148), "SandV4"),
    (5, 6, (84, 68, 52), "RockV3"),
    (5, 7, (60, 120, 44), "LeavesV3"),

    (6, 0, (84, 156, 60), "GrassV8"),
    (6, 1, (100, 172, 68), "GrassV9"),
    (6, 2, (148, 124, 84), "PathV5"),
    (6, 3, (80, 80, 80), "WallV4"),
    (6, 4, (52, 100, 160), "WaterV4"),
    (6, 5, (228, 212, 156), "SandV5"),
    (6, 6, (92, 76, 60), "RockV4"),
    (6, 7, (68, 136, 52), "LeavesV4"),

    (7, 0, (68, 140, 44), "GrassV10"),
    (7, 1, (88, 156, 56), "GrassV11"),
    (7, 2, (120, 96, 64), "PathV6"),
    (7, 3, (52, 52, 52), "WallV5"),
    (7, 4, (36, 84, 136), "WaterV5"),
    (7, 5, (196, 180, 124), "SandV6"),
    (7, 6, (76, 60, 44), "RockV5"),
    (7, 7, (52, 108, 36), "LeavesV5"),
]

def create_tileset():
    img = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    for row, col, color, label in TILES:
        x = col * TILE_SIZE
        y = row * TILE_SIZE
        draw.rectangle([x, y, x + TILE_SIZE - 1, y + TILE_SIZE - 1], fill=color)

    return img

if __name__ == '__main__':
    img = create_tileset()
    img.save('public/assets/tilesets/terrain-placeholder.png')
    print(f"Tileset created: {WIDTH}x{HEIGHT} ({COLS}x{ROWS} tiles)")
    print("Tile indices (row-major):")
    for row in range(ROWS):
        for col in range(COLS):
            idx = row * COLS + col
            label = TILES[row * COLS + col][3]
            print(f"  {idx:2d}: {label}")
