package com.matp.place.controller;


import com.matp.place.dto.PlaceResponseDto;
import com.matp.place.service.PlaceService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/places")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public Flux<PlaceResponseDto> getPlaces(@RequestParam("lon") double lon, @RequestParam("lat") double lat, @RequestParam("round") double round) {
        return placeService.getPlaces(lon, lat, round);
    }

}
