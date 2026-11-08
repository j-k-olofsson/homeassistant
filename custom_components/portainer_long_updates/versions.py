"""Match registry digests against every digest of the running image."""


def installed_digest(local_image, image_status):
    """Return the full matching digest, never compare shortened prefixes."""
    latest = image_status.registry_digest if image_status is not None else None
    if latest and any(
        reference.partition("@")[2] == latest
        for reference in local_image.repo_digests or ()
    ):
        return latest
    return None


def install():
    """Patch the native entity while preserving its fallback and formatting."""
    from homeassistant.components.portainer.update import (
        PortainerContainerImageUpdateEntity,
    )

    entity_class = PortainerContainerImageUpdateEntity
    original = entity_class.installed_version
    if not isinstance(original, property) or original.fget is None:
        raise TypeError("Unsupported Portainer installed_version property")
    if getattr(original.fget, "_ha_all_digests", False):
        raise ValueError("Portainer digest correction already installed")

    def installed_version(self):
        data = self.container_data
        if installed_digest(data.local_image, data.image_status) is not None:
            return self.latest_version
        return original.fget(self)

    installed_version._ha_all_digests = True
    entity_class.installed_version = property(
        installed_version, original.fset, original.fdel, original.__doc__
    )

    def uninstall():
        entity_class.installed_version = original

    return uninstall
