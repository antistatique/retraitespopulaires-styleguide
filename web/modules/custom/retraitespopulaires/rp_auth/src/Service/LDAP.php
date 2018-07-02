<?php

namespace Drupal\rp_auth\Service;

// Injection.
use Drupal\Core\Site\Settings;
use Drupal\rp_auth\Service\Exception\LdapConnectionException;
use Drupal\rp_auth\Service\Exception\LdapException;

/**
 * LDAP.
 */
class LDAP {
  /**
   * LDAP Server name or IP.
   *
   * @var string
   */
  public $server = '';

  /**
   * LDAP connection port.
   *
   * Eg. 389 by default or 636 thought SSL.
   *
   * @var int
   */
  public $port = 389;

  /**
   * LDAP Protocol version.
   *
   * @var int
   * @example 2|3
   */
  public $protocol = 3;

  /**
   * Connection to an LDAP server.
   *
   * @var resource
   */
  public $connection = NULL;

  /**
   * Binds to the LDAP directory with specified RDN and password.
   *
   * @var bool
   */
  public $bind = FALSE;

  /**
   * Settings used over configurationin settings.php for read-only.
   *
   * @var \Drupal\Core\Site\Settings
   */
  private $settings;

  /**
   * Class constructor.
   */
  public function __construct(Settings $settings) {
    $this->settings = $settings->get('rp_ldap');
  }

  /**
   * Try to inialize a connection to a LDAP.
   *
   * @param string $server
   *   The LDAP server name or IP.
   * @param int $port
   *   The LDAP Port to connect.
   * @param int $protocol
   *   The LDAP protocol to use.
   */
  public function connect($server, $port = 389, $protocol = 3) {
    $this->server   = $server;
    $this->port     = $port;
    $this->protocol = $protocol;

    if (!empty($this->server) && !empty($this->port)) {
      $this->connection = ldap_connect($this->server, $this->port);
      if (!$this->connection) {
        $connection_error = error_get_last();
        throw new LdapConnectionException($connection_error['message'], $connection_error['type']);
      }
    }
    else {
      throw new LdapConnectionException('Server and port arguments are required !');
    }
  }

  /**
   * Close current LDAP connection.
   */
  public function close() {
    // If ldap server is alive, close the current connection.
    if ($this->connection) {
      ldap_unbind($this->connection);
    }

    $this->connection = NULL;
  }

  /**
   * Try to authenticate a user with the given credentials.
   *
   * @param string $user
   *   LDAP Username.
   * @param string $password
   *   LDAP Password.
   *
   * @return bool
   *   Returns TRUE on success or FALSE on failure.
   */
  public function auth($user, $password) {

    // If ldap server is alive, close the current connection.
    if ($this->connection) {
      ldap_set_option($this->connection, LDAP_OPT_PROTOCOL_VERSION, $this->protocol);
      ldap_set_option($this->connection, LDAP_OPT_REFERRALS, 0);

      // Try to bind given credentials on multiple ldap paths.
      $paths = $this->settings['paths'];
      foreach ($paths as $path) {
        $ldapdn = 'cn=' . ldap_escape($user) . ',' . $path;

        // "@" suppresses warning messages returned by that command.
        // Since ldap_bind returns false when it doesn't succeed.
        $this->bind = @ldap_bind($this->connection, $ldapdn, $password);
        if ($this->bind) {
          return TRUE;
        }
      }
    }
    else {
      throw new LdapConnectionException('No LDAP connection available to process request.');
    }

    return FALSE;
  }

  /**
   * Search a user by cn in the LDAP.
   *
   * This method must be called after a succesfull auth.
   *
   * @param string $filter
   *   A valid LDAP field to filter. E.g cn (User) or member (Group).
   * @param string $search
   *   the search value on the LDAP.
   * @param string $dn
   *   The base DN for the directory to search on.
   * @param string $wildcard
   *   Allowed wildcard, used for search groups.
   *
   * @return array|false
   *   Multi-dimensionalarray on success and FALSE on error.
   */
  public function search($filter = 'cn', $search = '*', $dn = "*", $wildcard = '') {
    if ($this->bind) {
      $filter = '(' . $filter . '=' . ldap_escape($search, $wildcard) . ')';
      $result = ldap_search($this->connection, $dn, $filter);
      $info = ldap_get_entries($this->connection, $result);
      if ($info === FALSE || $info['count'] === 0) {
        throw new LdapException('LDAP no results found.');
      }
    }
    else {
      throw new LdapException('LDAP credentials unavailable.');
    }
    return $info;
  }

  /**
   * Return the LDAP error message of the last LDAP command.
   *
   * @return string
   *   String error message.
   */
  public function getLastException() {
    return ldap_error($this->connection);
  }

}
