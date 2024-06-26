"""
Mixins module - contains methods that adds extra functionalities to a Vase class
"""


class WritableOnCreateReadOnlyOnUpdateMixin:
    """
    This class make it makes the specified fields writeable during creation but
    lock the field during edit(read-only)
    
    - for example
    -- the is_vendor field in the user model should be filled once during instance creation
    -- and can't be changed during profile edit
    -- this prevent an account from switching from vendor to user vice versa
    """
    
    def get_fields(self):
        """
        make a field(s) specified in the parent class read-only on a PUT request
        """
        fields = super().get_fields()
        request = self.context.get('request', None)
        
        if request and request.method in ['PUT', 'PATCH']:
            # make a specified field read-only
            for field_name in self.Meta.writable_on_create_read_only_on_update:
                fields[field_name].read_only = True

            # Allow fields to be edited if specified or use the default
            for field in self.Meta.flexible_edit:
                fields[field].required = False

        return fields
