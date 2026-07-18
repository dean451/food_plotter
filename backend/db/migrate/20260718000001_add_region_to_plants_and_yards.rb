class AddRegionToPlantsAndYards < ActiveRecord::Migration[8.1]
  def change
    # Ecological/native region (e.g. "south_central", "northeast") — distinct
    # from zone_min/zone_max, which only capture cold-hardiness. A plant can be
    # zone-appropriate for a place without being native to it.
    add_column :plants, :region, :string

    # The yard's own region, set by the gardener alongside hardiness_zone.
    # Only used to gate which "native" category plants are surfaced as native
    # for this yard — non-native plants are unaffected by it.
    add_column :yards, :region, :string
  end
end
