#!/usr/bin/env python3
"""
Generate Tiled JSON map for First Playable World.
Map: 40x30 tiles (640x480 px)
Layers: Ground, Water, Decoration, Collision, Objects
"""

import json

MAP_WIDTH = 40
MAP_HEIGHT = 30
TILE_SIZE = 16

# Tile indices (from terrain-placeholder.png)
EMPTY = 0
GRASS = 1
PATH = 2
WALL = 3
WATER = 4
SAND = 5
ROCK = 6
TRUNK = 7
GRASS_DARK = 8
GRASS_LIGHT = 9
PATH_LIGHT = 10
PATH_DARK = 11
WATER_LIGHT = 12
SAND_LIGHT = 13
ROCK_LIGHT = 14
LEAVES = 15
BUILDING_WALL = 16
BUILDING_DARK = 17
DOOR = 18
SIGN = 19
PARKING = 20
PARKING_LINE = 21
POOL = 22
SAND_DARK = 23
GRASS_V2 = 24
GRASS_V3 = 25

def create_layer_data(width, height, default=0):
    return [default] * (width * height)

def set_tile(data, x, y, tile_id, map_width=MAP_WIDTH):
    if 0 <= x < MAP_WIDTH and 0 <= y < MAP_HEIGHT:
        data[y * map_width + x] = tile_id

def fill_rect(data, x1, y1, x2, y2, tile_id, map_width=MAP_WIDTH):
    for y in range(y1, y2 + 1):
        for x in range(x1, x2 + 1):
            set_tile(data, x, y, tile_id, map_width)

def create_ground_layer():
    """Ground layer: grass, paths, sand, parking"""
    data = create_layer_data(MAP_WIDTH, MAP_HEIGHT, GRASS)

    # Main path (vertical, columns 18-21)
    fill_rect(data, 18, 0, 21, 29, PATH)

    # Path variations
    for y in range(0, 30, 3):
        set_tile(data, 18, y, PATH_DARK)
        set_tile(data, 21, y, PATH_LIGHT)

    # Beach area (right side, columns 28-39)
    fill_rect(data, 28, 0, 39, 29, SAND)
    # Sand variations
    for y in range(0, 30, 4):
        fill_rect(data, 28, y, 39, min(y + 1, 29), SAND_LIGHT)

    # Parking area (bottom-left, rows 20-26, cols 2-10)
    fill_rect(data, 2, 20, 10, 26, PARKING)
    # Parking lines
    for x in range(3, 10, 2):
        set_tile(data, x, 22, PARKING_LINE)
        set_tile(data, x, 24, PARKING_LINE)

    # Surf school floor (bottom-center, rows 18-24, cols 12-17)
    fill_rect(data, 12, 18, 17, 24, PATH_DARK)

    # Grass variations throughout
    for y in range(0, 30):
        for x in range(0, 18):
            if data[y * MAP_WIDTH + x] == GRASS:
                if (x + y) % 5 == 0:
                    set_tile(data, x, y, GRASS_DARK)
                elif (x + y) % 7 == 0:
                    set_tile(data, x, y, GRASS_LIGHT)
                elif (x + y) % 11 == 0:
                    set_tile(data, x, y, GRASS_V2)

    return data

def create_water_layer():
    """Water layer: ocean on the right"""
    data = create_layer_data(MAP_WIDTH, MAP_HEIGHT, EMPTY)

    # Ocean (columns 32-39)
    fill_rect(data, 32, 0, 39, 29, WATER)

    # Water variations
    for y in range(0, 30, 3):
        fill_rect(data, 32, y, 39, min(y, 29), WATER_LIGHT)

    # Water edge (column 31)
    for y in range(0, 30):
        if y % 2 == 0:
            set_tile(data, 31, y, WATER_LIGHT)

    return data

def create_decoration_layer():
    """Decoration layer: trees, rocks, signs"""
    data = create_layer_data(MAP_WIDTH, MAP_HEIGHT, EMPTY)

    # Trees - left side forest (columns 0-16, rows 0-17)
    tree_positions = [
        # Top-left forest
        (1, 1), (2, 1), (4, 1), (6, 1), (8, 1), (10, 1),
        (1, 3), (3, 3), (5, 3), (7, 3), (9, 3),
        (1, 5), (2, 5), (4, 5), (6, 5), (8, 5),
        (1, 7), (3, 7), (5, 7), (7, 7), (9, 7),
        (1, 9), (2, 9), (4, 9), (6, 9), (8, 9),
        (1, 11), (3, 11), (5, 11), (7, 11),
        (1, 13), (2, 13), (4, 13), (6, 13),
        (1, 15), (3, 15), (5, 15), (7, 15),
        # Middle trees (between path and beach)
        (23, 2), (24, 2), (26, 2),
        (23, 5), (25, 5), (27, 5),
        (23, 8), (24, 8), (26, 8),
        (23, 11), (25, 11), (27, 11),
        (23, 14), (24, 14), (26, 14),
    ]

    for x, y in tree_positions:
        set_tile(data, x, y, TRUNK)
        # Add leaves above if space
        if y > 0:
            set_tile(data, x, y - 1, LEAVES)

    # Rocks near beach
    rock_positions = [
        (29, 3), (30, 3),
        (29, 10), (30, 10),
        (29, 17), (30, 17),
        (29, 24), (30, 24),
    ]
    for x, y in rock_positions:
        set_tile(data, x, y, ROCK)

    # Welcome sign (near path entrance)
    set_tile(data, 17, 14, SIGN)

    return data

def create_collision_layer():
    """Collision layer: only solid tiles"""
    data = create_layer_data(MAP_WIDTH, MAP_HEIGHT, EMPTY)

    # Trees (trunks are solid)
    tree_positions = [
        (1, 1), (2, 1), (4, 1), (6, 1), (8, 1), (10, 1),
        (1, 3), (3, 3), (5, 3), (7, 3), (9, 3),
        (1, 5), (2, 5), (4, 5), (6, 5), (8, 5),
        (1, 7), (3, 7), (5, 7), (7, 7), (9, 7),
        (1, 9), (2, 9), (4, 9), (6, 9), (8, 9),
        (1, 11), (3, 11), (5, 11), (7, 11),
        (1, 13), (2, 13), (4, 13), (6, 13),
        (1, 15), (3, 15), (5, 15), (7, 15),
        (23, 2), (24, 2), (26, 2),
        (23, 5), (25, 5), (27, 5),
        (23, 8), (24, 8), (26, 8),
        (23, 11), (25, 11), (27, 11),
        (23, 14), (24, 14), (26, 14),
    ]
    for x, y in tree_positions:
        set_tile(data, x, y, WALL)

    # Rocks
    rock_positions = [
        (29, 3), (30, 3),
        (29, 10), (30, 10),
        (29, 17), (30, 17),
        (29, 24), (30, 24),
    ]
    for x, y in rock_positions:
        set_tile(data, x, y, WALL)

    # Surf school building walls (rows 18-24, cols 12-17)
    # Top wall
    fill_rect(data, 12, 18, 17, 18, WALL)
    # Bottom wall
    fill_rect(data, 12, 24, 17, 24, WALL)
    # Left wall
    fill_rect(data, 12, 18, 12, 24, WALL)
    # Right wall
    fill_rect(data, 17, 18, 17, 24, WALL)
    # Door (row 24, col 14-15) - leave empty for entry
    set_tile(data, 14, 24, EMPTY)
    set_tile(data, 15, 24, EMPTY)

    # Parking area boundary
    fill_rect(data, 2, 20, 2, 26, WALL)
    fill_rect(data, 10, 20, 10, 26, WALL)

    # Map edges (left, top)
    fill_rect(data, 0, 0, 0, 29, WALL)
    fill_rect(data, 0, 0, 39, 0, WALL)

    return data

def create_object_layer():
    """Object layer: spawn points, triggers"""
    objects = [
        {
            "id": 1,
            "name": "player-start",
            "type": "PlayerSpawn",
            "x": 19 * TILE_SIZE,
            "y": 15 * TILE_SIZE,
            "width": TILE_SIZE,
            "height": TILE_SIZE
        },
        {
            "id": 2,
            "name": "surf-trigger",
            "type": "SurfTrigger",
            "x": 30 * TILE_SIZE,
            "y": 15 * TILE_SIZE,
            "width": TILE_SIZE * 2,
            "height": TILE_SIZE * 2
        },
        {
            "id": 3,
            "name": "school-entrance",
            "type": "SchoolEntrance",
            "x": 14 * TILE_SIZE,
            "y": 24 * TILE_SIZE,
            "width": TILE_SIZE * 2,
            "height": TILE_SIZE
        },
        {
            "id": 4,
            "name": "parking-area",
            "type": "Parking",
            "x": 2 * TILE_SIZE,
            "y": 20 * TILE_SIZE,
            "width": TILE_SIZE * 9,
            "height": TILE_SIZE * 7
        },
        {
            "id": 5,
            "name": "welcome-sign",
            "type": "WelcomeSign",
            "x": 17 * TILE_SIZE,
            "y": 14 * TILE_SIZE,
            "width": TILE_SIZE,
            "height": TILE_SIZE,
            "properties": [
                {
                    "name": "message",
                    "type": "string",
                    "value": "Bienvenido a Playa de Calblanque — ¡disfruta del surf!"
                }
            ]
        }
    ]
    return objects

def create_tiled_json():
    ground_data = create_ground_layer()
    water_data = create_water_layer()
    decoration_data = create_decoration_layer()
    collision_data = create_collision_layer()
    objects = create_object_layer()

    tiled_map = {
        "compressionlevel": -1,
        "height": MAP_HEIGHT,
        "width": MAP_WIDTH,
        "infinite": False,
        "layers": [
            {
                "data": ground_data,
                "height": MAP_HEIGHT,
                "id": 1,
                "name": "Ground",
                "opacity": 1,
                "type": "tilelayer",
                "visible": True,
                "width": MAP_WIDTH,
                "x": 0,
                "y": 0
            },
            {
                "data": water_data,
                "height": MAP_HEIGHT,
                "id": 2,
                "name": "Water",
                "opacity": 1,
                "type": "tilelayer",
                "visible": True,
                "width": MAP_WIDTH,
                "x": 0,
                "y": 0
            },
            {
                "data": decoration_data,
                "height": MAP_HEIGHT,
                "id": 3,
                "name": "Decoration",
                "opacity": 1,
                "type": "tilelayer",
                "visible": True,
                "width": MAP_WIDTH,
                "x": 0,
                "y": 0
            },
            {
                "data": collision_data,
                "height": MAP_HEIGHT,
                "id": 4,
                "name": "Collision",
                "opacity": 1,
                "type": "tilelayer",
                "visible": True,
                "width": MAP_WIDTH,
                "x": 0,
                "y": 0
            },
            {
                "draworder": "topdown",
                "id": 5,
                "name": "Objects",
                "objects": objects,
                "opacity": 1,
                "type": "objectgroup",
                "visible": True,
                "x": 0,
                "y": 0
            }
        ],
        "nextlayerid": 6,
        "nextobjectid": 6,
        "orientation": "orthogonal",
        "renderorder": "right-down",
        "tiledversion": "1.10",
        "tileheight": TILE_SIZE,
        "tilesets": [
            {
                "firstgid": 1,
                "name": "terrain-placeholder",
                "image": "../../tilesets/terrain-placeholder.png",
                "imagewidth": 128,
                "imageheight": 128,
                "tilecount": 64,
                "tilecolumns": 8,
                "tilewidth": TILE_SIZE,
                "tileheight": TILE_SIZE
            }
        ],
        "tilewidth": TILE_SIZE,
        "type": "map",
        "version": "1.10"
    }

    return tiled_map

if __name__ == '__main__':
    tiled_map = create_tiled_json()

    output_path = 'public/assets/maps/murcia/playa-calblanque/playa-calblanque.tmj'
    with open(output_path, 'w') as f:
        json.dump(tiled_map, f, indent=2)

    print(f"Map created: {MAP_WIDTH}x{MAP_HEIGHT} tiles ({MAP_WIDTH * TILE_SIZE}x{MAP_HEIGHT * TILE_SIZE} px)")
    print(f"Layers: Ground, Water, Decoration, Collision, Objects")
    print(f"Objects: {len(tiled_map['layers'][4]['objects'])}")
    print(f"Output: {output_path}")
